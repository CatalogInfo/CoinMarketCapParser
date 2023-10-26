import ExcnhageCalculator from "../../calculator/exchange_calculator";
import GateMapper from "../../mapper/gate_mapper";
import TradingSymbol from "../../models/trading_symbol";
import { SymbolBaseQuote, BidsAsks } from "../../outputter/exchanges_data_types";
import SymbolUtils from "../../utils/symbol_utils";
import ExchangeMapper from "../exchange_mapper";
import ExchangeParser from "../exchange_parser";
import GateApi from "./gate_api";

export default class GateParse extends ExchangeParser{
  tradingSymbols: TradingSymbol[] = [];
  SLEEP_TIME = 200;

  async getBaseQuoteAssets(): Promise<SymbolBaseQuote[]> {
    const { data: tradingPairs } = await GateApi.getExchangeInfo();
    ExchangeMapper.convertSymbolBaseToTradingSymbols(this.tradingSymbols, GateMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets));

    return GateMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets);
  }

  protected async obtainOrderBook(symbol: TradingSymbol): Promise<BidsAsks> {
    const fullSymbol = SymbolUtils.getFullSymbol(symbol, "");

    const { data: orderBook } = await GateApi.getOrderBook(fullSymbol);

    return GateMapper.convertOrderBookResponseToBidsAsks(orderBook);
  }
}
