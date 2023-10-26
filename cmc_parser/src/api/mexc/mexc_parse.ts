import MexcMapper from "../../mapper/mexc_mapper";
import TradingSymbol from "../../models/trading_symbol";
import { BidsAsks, SymbolBaseQuote } from "../../outputter/exchanges_data_types";
import SymbolUtils from "../../utils/symbol_utils";
import ExchangeMapper from "../exchange_mapper";
import ExchangeParser from "../exchange_parser";
import MexcApi from "./mexc_api";

export default class MexcParse extends ExchangeParser {
  tradingSymbols: TradingSymbol[] = [];
  SLEEP_TIME = 200;

  async getBaseQuoteAssets(): Promise<SymbolBaseQuote[]> {
    const { data: tradingPairs } = await MexcApi.getExchangeInfo();
    ExchangeMapper.convertSymbolBaseToTradingSymbols(this.tradingSymbols, MexcMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets));

    return MexcMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets);
  }

  protected async obtainOrderBook(symbol: TradingSymbol): Promise<BidsAsks> {
    const fullSymbol = SymbolUtils.getFullSymbol(symbol, "");

    const { data: orderBook } = await MexcApi.getOrderBook(fullSymbol);

    return MexcMapper.convertOrderBookResponseToBidsAsks(orderBook);
  }
}
