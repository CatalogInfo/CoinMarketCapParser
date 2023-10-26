import MexcMapper from "../../mapper/mexc_mapper";
import TradingSymbol from "../../models/trading_symbol";
import { BidsAsks, SymbolBaseQuote } from "../../outputter/exchanges_data_types";
import ErrorUtils from "../../utils/error_utils";
import SymbolUtils from "../../utils/symbol_utils";
import ExchangeParser from "../exchange_parser";
import MexcApi from "./mexc_api";

export default class MexcParse extends ExchangeParser {
  tradingSymbols: TradingSymbol[] = [];
  SLEEP_TIME = 200;

  async getBaseQuoteAssets(): Promise<SymbolBaseQuote[]> {
    const { data: tradingPairs } = await MexcApi.getExchangeInfo();
    MexcMapper.convertSymbolBaseToTradingSymbols(this.tradingSymbols, MexcMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets));

    return MexcMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets);
  }

  protected async obtainOrderBook(symbol: TradingSymbol): Promise<BidsAsks> {
    const fullSymbol = SymbolUtils.getFullSymbol(symbol, "");

    const { data: orderBook, status: status } = await MexcApi.getOrderBook(fullSymbol);

    ErrorUtils.defineError(status);

    return MexcMapper.convertOrderBookResponseToBidsAsks(orderBook);
  }
}
