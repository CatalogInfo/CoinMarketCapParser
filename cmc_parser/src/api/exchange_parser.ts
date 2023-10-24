import ExcnhageCalculator from "../calculator/exchange_calculator";
import TradingSymbol from "../models/trading_symbol";
import { BidsAsks, SymbolBaseQuote } from "../outputter/exchanges_data_types";
import TimerUtils from "../utils/timer_utils";

export default abstract class ExchangeParser {
  requiredQuoteAssets = ["USDT"];
  abstract tradingSymbols: TradingSymbol[];
  abstract SLEEP_TIME: number;

  async parseOrderBookTradingSymols() {
    const symbols = await this.getBaseQuoteAssets();

    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      const pair = await ExcnhageCalculator.asyncCalculs(symbol, async () => await this.obtainOrderBook(symbol));

      if (pair === undefined) {
        return;
      }

      this.tradingSymbols.push(pair);
      
      await TimerUtils.sleep(this.SLEEP_TIME);
    }
  } 

  protected abstract getBaseQuoteAssets(): Promise<SymbolBaseQuote[]>;
  protected abstract obtainOrderBook(symbol: SymbolBaseQuote): Promise<BidsAsks>;

}