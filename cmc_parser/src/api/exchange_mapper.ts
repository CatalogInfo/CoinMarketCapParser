import TradingSymbol from "../models/trading_symbol";
import { SymbolBaseQuote } from "../outputter/exchanges_data_types";

export default class ExchangeMapper {
  static convertSymbolBaseToTradingSymbols(tradingSymbols: TradingSymbol[], baseSymbols: SymbolBaseQuote[]) {

    return baseSymbols.map(symbol => {
      return tradingSymbols.push({
        baseAsset: symbol.baseAsset,
        quoteAsset: symbol.quoteAsset,
        fullName: null,
        bid: 0,
        ask: 0
      });
    })
 
  }
}