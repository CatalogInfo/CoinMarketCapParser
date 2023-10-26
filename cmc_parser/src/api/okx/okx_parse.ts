import OkxMapper from "../../mapper/okx_mapper";
import TradingSymbol from "../../models/trading_symbol";
import { SymbolBaseQuote, BidsAsks } from "../../outputter/exchanges_data_types";
import ErrorUtils from "../../utils/error_utils";
import SymbolUtils from "../../utils/symbol_utils";
import ExchangeParser from "../exchange_parser";
import OkxApi from "./okx_api";

export default class OkxParse extends ExchangeParser {
  tradingSymbols: TradingSymbol[] = [];
  SLEEP_TIME = 200;

  async getBaseQuoteAssets(): Promise<SymbolBaseQuote[]> {
    const { data: tradingPairs } = await OkxApi.getExchangeInfo();
    OkxMapper.convertSymbolBaseToTradingSymbols(this.tradingSymbols, OkxMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets));
    return OkxMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets);
  }

  protected async obtainOrderBook(symbol: TradingSymbol): Promise<BidsAsks> {
    const fullSymbol = SymbolUtils.getFullSymbol(symbol, "-");

    const { data: orderBook, status: status } = await OkxApi.getOrderBook(fullSymbol);

    ErrorUtils.defineError(status);
    
    return OkxMapper.convertOrderBookResponseToBidsAsks(orderBook.data[0]);
  }
}
