import HuobiMapper from "../../mapper/huobi_mapper";
import TradingSymbol from "../../models/trading_symbol";
import { BidsAsks, SymbolBaseQuote } from "../../outputter/exchanges_data_types";
import SymbolUtils from "../../utils/symbol_utils";
import ExchangeParser from "../exchange_parser";
import HuobiApi from "./huobi_api";

export default class HuobiParse extends ExchangeParser {
  tradingSymbols: TradingSymbol[] = [];
  SLEEP_TIME = 200;

  protected async getBaseQuoteAssets(): Promise<SymbolBaseQuote[]> {
    const { data: tradingPairs } = await HuobiApi.getExchangeInfo();
    
    return HuobiMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets);
  }

  protected async obtainOrderBook(symbol: SymbolBaseQuote): Promise<BidsAsks> {
    const fullSymbol = SymbolUtils.getFullSymbol(symbol, "").toLowerCase();

    const { data: orderBook } = await HuobiApi.getOrderBook(fullSymbol);

    return HuobiMapper.convertOrderBookResponseToBidsAsks(orderBook);
  }
}