import BybitMapper from "../../mapper/bybit_mapper";
import TradingSymbol from "../../models/trading_symbol";
import { BidsAsks, SymbolBaseQuote } from "../../outputter/exchanges_data_types";
import SymbolUtils from "../../utils/symbol_utils";
import ExchangeMapper from "../exchange_mapper";
import ExchangeParser from "../exchange_parser";
import BybitApi from "./bybit_api";

export default class BybitParse extends ExchangeParser {
  tradingSymbols: TradingSymbol[] = [];
  SLEEP_TIME = 100;

  async getBaseQuoteAssets(): Promise<SymbolBaseQuote[]> {
    const { data: tradingPairs } = await BybitApi.getExchangeInfo();
    ExchangeMapper.convertSymbolBaseToTradingSymbols(this.tradingSymbols, BybitMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets));

    return BybitMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets);
  }

  protected async obtainOrderBook(symbol: TradingSymbol): Promise<BidsAsks> {
    const fullSymbol = SymbolUtils.getFullSymbol(symbol, "");

    const { data: orderBook } = await BybitApi.getOrderBook(fullSymbol);

    return BybitMapper.convertOrderBookResponseToBidsAsks(orderBook);
  }
}
