import BinanceMapper from "../../mapper/binance_mapper";
import TradingSymbol from "../../models/trading_symbol";
import { BidsAsks, SymbolBaseQuote } from "../../outputter/exchanges_data_types";
import ErrorUtils from "../../utils/error_utils";
import SymbolUtils from "../../utils/symbol_utils";
import ExchangeParser from "../exchange_parser";
import BinanceApi from "./binance_api";

export default class BinanceParse extends ExchangeParser {
  tradingSymbols: TradingSymbol[] = [];
  SLEEP_TIME = 100;

  async getBaseQuoteAssets(): Promise<SymbolBaseQuote[]> {
    const { data: tradingPairs } = await BinanceApi.getExchangeInfo();
    BinanceMapper.convertSymbolBaseToTradingSymbols(this.tradingSymbols, BinanceMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets));

    return BinanceMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets);
  }

  protected async obtainOrderBook(symbol: TradingSymbol): Promise<BidsAsks> {
    const fullSymbol = SymbolUtils.getFullSymbol(symbol, "");

    const { data: orderBook, status: status } = await BinanceApi.getOrderBook(fullSymbol);

    ErrorUtils.defineError(status);

    return BinanceMapper.convertOrderBookResponseToBidsAsks(orderBook);
  }
}
