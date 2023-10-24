import BinanceMapper from "../../mapper/binance_mapper";
import TradingSymbol from "../../models/trading_symbol";
import { BidsAsks, SymbolBaseQuote } from "../../outputter/exchanges_data_types";
import SymbolUtils from "../../utils/symbol_utils";
import ExchangeParser from "../exchange_parser";
import BinanceApi from "./binance_api";

export default class BinanceParse extends ExchangeParser {
  tradingSymbols: TradingSymbol[] = [];
  SLEEP_TIME = 200;

  protected async getBaseQuoteAssets(): Promise<SymbolBaseQuote[]> {
    const { data: tradingPairs } = await BinanceApi.getExchangeInfo();
    
    return BinanceMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets);
  }

  protected async obtainOrderBook(symbol: SymbolBaseQuote): Promise<BidsAsks> {
    const fullSymbol = SymbolUtils.getFullSymbol(symbol, "");

    const { data: orderBook } = await BinanceApi.getOrderBook(fullSymbol);

    return BinanceMapper.convertOrderBookResponseToBidsAsks(orderBook);
  }
}
