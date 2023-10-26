import BitrueMapper from "../../mapper/bitrue_mapper";
import TradingSymbol from "../../models/trading_symbol";
import { SymbolBaseQuote, BidsAsks } from "../../outputter/exchanges_data_types";
import SymbolUtils from "../../utils/symbol_utils";
import ExchangeMapper from "../exchange_mapper";
import ExchangeParser from "../exchange_parser";
import BitrueApi from "./bitrue_api";

export default class BitrueParse extends ExchangeParser {
  tradingSymbols: TradingSymbol[] = [];
  SLEEP_TIME = 100;

  async getBaseQuoteAssets(): Promise<SymbolBaseQuote[]> {
    const { data: tradingPairs } = await BitrueApi.getExchangeInfo();
    ExchangeMapper.convertSymbolBaseToTradingSymbols(this.tradingSymbols, BitrueMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets));

    return BitrueMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets);
  }

  protected async obtainOrderBook(symbol: TradingSymbol): Promise<BidsAsks> {
    const fullSymbol = SymbolUtils.getFullSymbol(symbol, "");

    const { data: orderBook } = await BitrueApi.getOrderBook(fullSymbol);

    return BitrueMapper.convertOrderBookResponseToBidsAsks(orderBook);
  }
}
