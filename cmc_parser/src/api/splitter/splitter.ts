import TradingSymbol from "../../models/trading_symbol";
import BinanceParse from "../binance/binance_parse";
import ExchangeParser from "../exchange_parser";
import OkxParse from "../okx/okx_parse";

export default class Splitter {
  
  static exchanges: ExchangeParser[] = [];

  private static init() {
    this.exchanges.push(new BinanceParse);
    this.exchanges.push(new OkxParse);
  }

  static async split() {
    this.init();

    await Promise.all(this.exchanges.map(async (exc) => {
      await exc.getBaseQuoteAssets();
    }));

    const pairs: TradingSymbol[][] = this.exchanges.map(exc => exc.tradingSymbols);

    const outputPairs: TradingSymbol[][] = this.findRepeatedBaseAndQuoteElements(pairs);

    for(let i = 0; i < this.exchanges.length; i ++) {
      this.exchanges[i].tradingSymbols = outputPairs[i];
    }

    await Promise.all(this.exchanges.map(async (value) => {
      return value.parseOrderBookTradingSymols(value.tradingSymbols);
    }));
  }

  static findRepeatedBaseAndQuoteElements(arrayOfPairs: TradingSymbol[][]): TradingSymbol[][] {
    const pairCounts: { [key: string]: number } = {};
    const repeatedPairs: Set<string> = new Set();

    // Count the occurrences of each pair (base and quote) in the arrays
    for (const pairs of arrayOfPairs) {
        for (const pair of pairs) {
            const { baseAsset, quoteAsset } = pair;
            const key = `${baseAsset}_${quoteAsset}`;
            if (key in pairCounts) {
                pairCounts[key]++;
            } else {
                pairCounts[key] = 1;
            }
        }
    }

    // Identify repeated pairs
    for (const key in pairCounts) {
        if (pairCounts[key] > 1) {
            repeatedPairs.add(key);
        }
    }

    // Create the output arrays for each input array
    const outputArray: TradingSymbol[][] = [];
    for (const pairs of arrayOfPairs) {
        const outputPairs = pairs.filter(pair => {
            const key = `${pair.baseAsset}_${pair.quoteAsset}`;
            return repeatedPairs.has(key);
        });
        outputArray.push(outputPairs);
    }

    return outputArray;
}

}