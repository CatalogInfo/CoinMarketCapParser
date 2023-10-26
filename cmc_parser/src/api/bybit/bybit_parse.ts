import BybitMapper from "../../mapper/bybit_mapper";
import TradingSymbol from "../../models/trading_symbol";
import { BidsAsks, SymbolBaseQuote } from "../../outputter/exchanges_data_types";
import ErrorUtils from "../../utils/error_utils";
import SymbolUtils from "../../utils/symbol_utils";
import ExchangeParser from "../exchange_parser";
import BybitApi from "./bybit_api";

export default class BybitParse extends ExchangeParser {
  tradingSymbols: TradingSymbol[] = [];
  SLEEP_TIME = 100;

  async getBaseQuoteAssets(): Promise<SymbolBaseQuote[]> {
    const { data: tradingPairs } = await BybitApi.getExchangeInfo();
    BybitMapper.convertSymbolBaseToTradingSymbols(this.tradingSymbols, BybitMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets));

    return BybitMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets);
  }

  protected async obtainOrderBook(symbol: TradingSymbol): Promise<BidsAsks> {
    const fullSymbol = SymbolUtils.getFullSymbol(symbol, "");

    const { data: orderBook, status: status } = await BybitApi.getOrderBook(fullSymbol);

    ErrorUtils.defineError(status);

    return BybitMapper.convertOrderBookResponseToBidsAsks(orderBook);
  }
}
