import TradingSymbol from "../models/trading_symbol";

export default class SymbolUtils {
  static getFullSymbol(symbol: TradingSymbol, splitter: string) {
    return symbol.baseAsset + splitter + symbol.quoteAsset;
  }
}