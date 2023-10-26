import BitrueMapper from "../../mapper/bitrue_mapper";
import TradingSymbol from "../../models/trading_symbol";
import { SymbolBaseQuote, BidsAsks } from "../../outputter/exchanges_data_types";
import ErrorUtils from "../../utils/error_utils";
import SymbolUtils from "../../utils/symbol_utils";
import ExchangeParser from "../exchange_parser";
import BitrueApi from "./bitrue_api";

export default class BitrueParse extends ExchangeParser {
  tradingSymbols: TradingSymbol[] = [];
  SLEEP_TIME = 100;

  async getBaseQuoteAssets(): Promise<SymbolBaseQuote[]> {
    const { data: tradingPairs } = await BitrueApi.getExchangeInfo();
    BitrueMapper.convertSymbolBaseToTradingSymbols(this.tradingSymbols, BitrueMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets));

    return BitrueMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets);
  }

  protected async obtainOrderBook(symbol: TradingSymbol): Promise<BidsAsks> {
    const fullSymbol = SymbolUtils.getFullSymbol(symbol, "");

    const { data: orderBook, status: status } = await BitrueApi.getOrderBook(fullSymbol);

    ErrorUtils.defineError(status);

    return BitrueMapper.convertOrderBookResponseToBidsAsks(orderBook);
  }
}
