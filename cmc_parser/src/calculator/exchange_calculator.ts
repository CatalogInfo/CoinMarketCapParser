import { SymbolBaseQuote, BidsAsks } from "../outputter/exchanges_data_types";
import ExchangeOutputter from "../outputter/exchange_outputter";
import CalculateUtils from "../utils/calculate_utils";

export default class ExcnhageCalculator {
  static async asyncCalculs(symbol: SymbolBaseQuote, obtainOrderBook: (symbol: SymbolBaseQuote) => Promise<BidsAsks>) {
    const finalPrices = CalculateUtils.calculatePriceForLiquidity(
      2000,
      await obtainOrderBook(symbol)
    );

    return ExchangeOutputter.getTradingSymbolFormatted(symbol, finalPrices);
  }
}