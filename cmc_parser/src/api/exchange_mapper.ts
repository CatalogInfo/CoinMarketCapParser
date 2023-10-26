import TradingSymbol from "../models/trading_symbol";
import { BidsAsks, Order, SymbolBaseQuote } from "../outputter/exchanges_data_types";

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

  static addToBidsAsks(
    limitsFromResponse: number[][],
    bidsAsksEntity: Order[]
  ) {
    if (limitsFromResponse.length === 0) {
      return;
    }

    limitsFromResponse.map((value: number[]) => {
      const price = value[0];
      const amount = value[1];

      const order: Order = { price, amount };
      bidsAsksEntity.push(order);
    });
  }

  static convertOrderBookResponseToBidsAsksBase(
    bids: number[][], asks: number[][]
  ) {
    const bidsAsks: BidsAsks = { bids: [], asks: [] };

    ExchangeMapper.addToBidsAsks(bids, bidsAsks.bids);
    ExchangeMapper.addToBidsAsks(asks, bidsAsks.asks);

    return bidsAsks;
  }
}