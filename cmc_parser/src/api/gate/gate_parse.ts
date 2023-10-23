import ExcnhageCalculator from "../../calculator/exchange_calculator";
import GateMapper from "../../mapper/gate_mapper";
import TradingSymbol from "../../models/trading_symbol";
import { SymbolBaseQuote, BidsAsks } from "../../outputter/exchanges_data_types";
import SymbolUtils from "../../utils/symbol_utils";
import TimerUtils from "../../utils/timer_utils";
import GateApi from "./gate_api";

export default class GateParse {
  static tradingSymbols: TradingSymbol[] = [];
  static requiredQuoteAssets = ["USDT"];
  static SLEEP_TIME = 200;

  static async parseOrderBookTradingSymols() {
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

  private static async getBaseQuoteAssets(): Promise<SymbolBaseQuote[]> {
    const { data: tradingPairs } = await GateApi.getExchangeInfo();
    
    return GateMapper.convertAssetsToSymbolQouteBase(tradingPairs, this.requiredQuoteAssets);
  }

  private static async obtainOrderBook(symbol: SymbolBaseQuote): Promise<BidsAsks> {
    const fullSymbol = SymbolUtils.getFullSymbol(symbol, "_");

    const { data: orderBook } = await GateApi.getOrderBook(fullSymbol);

    return GateMapper.convertOrderBookResponseToBidsAsks(orderBook);
  }
}
