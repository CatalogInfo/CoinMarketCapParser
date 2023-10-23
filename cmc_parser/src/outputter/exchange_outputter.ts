import { SymbolBaseQuote } from "./exchanges_data_types";

export default class ExchangeOutputter {
  static getTradingSymbolFormatted(symbol: SymbolBaseQuote, finalPrices: { bid: number, ask: number } | undefined) {
    if(finalPrices?.bid === undefined || finalPrices.ask === undefined) {
      return;
    }

    return {
      baseAsset: symbol.baseAsset,
      quoteAsset: symbol.quoteAsset,
      fullName: null,
      bid: finalPrices.bid,
      ask: finalPrices.ask,
    }

  }
}