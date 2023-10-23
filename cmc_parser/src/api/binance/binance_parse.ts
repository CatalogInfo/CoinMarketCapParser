import ExcnhageCalculator from "../../calculator/exchange_calculator";
import BinanceMapper from "../../mapper/binance_mapper";
import TradingSymbol from "../../models/trading_symbol";
import { BidsAsks, SymbolBaseQuote } from "../../outputter/exchanges_data_types";
import SymbolUtils from "../../utils/symbol_utils";
import TimerUtils from "../../utils/timer_utils";
import BinanceApi from "./binance_api";

export default class BinanceParse {
  static tradingSymbols: TradingSymbol[] = [];
  static requiredQuoteAssets = ["USDT"];

  static async parseOrderBookTradingSymols() {
    const symbols = await this.getBaseQuoteAssets();

    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      const pair = await ExcnhageCalculator.asyncCalculs(symbol, async () => await this.obtainOrderBook(symbol));

      if (pair === undefined) {
        continue;
      }

      this.tradingSymbols.push(pair);

      await TimerUtils.sleep(200);
    }
  }  

  private static async getBaseQuoteAssets(): Promise<SymbolBaseQuote[]> {
    const { data: tradingPairs } = await BinanceApi.getExchangeInfo();
    
    return BinanceMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets);
  }

  private static async obtainOrderBook(symbol: SymbolBaseQuote): Promise<BidsAsks> {
    const fullSymbol = SymbolUtils.getFullSymbol(symbol, "");

    const { data: orderBook } = await BinanceApi.getOrderBook(fullSymbol);

    return BinanceMapper.convertOrderBookResponseToBidsAsks(orderBook);
  }
}
