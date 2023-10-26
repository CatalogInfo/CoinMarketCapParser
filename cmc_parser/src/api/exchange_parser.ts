import ExcnhageCalculator from "../calculator/exchange_calculator";
import TradingSymbol from "../models/trading_symbol";
import { BidsAsks, SymbolBaseQuote } from "../outputter/exchanges_data_types";
import TimerUtils from "../utils/timer_utils";

export default abstract class ExchangeParser {
  requiredQuoteAssets = ["USDT"];
  abstract tradingSymbols: TradingSymbol[];
  abstract SLEEP_TIME: number;

  async parseOrderBookTradingSymols(tradingSymbols: TradingSymbol[]) {

    this.tradingSymbols = [];
    const length = tradingSymbols.length;
    for (let i = 0; i < length; i++) {
      const symbol = tradingSymbols[i];
      const pair = await ExcnhageCalculator.asyncCalculs(symbol, async () => await this.obtainOrderBook(symbol));

      if (pair === undefined) {
        continue;
      }

      this.tradingSymbols.push(pair);
      
      await TimerUtils.sleep(this.SLEEP_TIME);
    }
  } 

  abstract getBaseQuoteAssets(): Promise<SymbolBaseQuote[]>;
  protected abstract obtainOrderBook(symbol: SymbolBaseQuote): Promise<BidsAsks>;

}