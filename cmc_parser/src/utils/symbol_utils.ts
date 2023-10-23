import { SymbolBaseQuote } from "../outputter/exchanges_data_types";

export default class SymbolUtils {
  static getFullSymbol(symbol: SymbolBaseQuote, splitter: string) {
    return symbol.baseAsset + splitter + symbol.quoteAsset;
  }
}