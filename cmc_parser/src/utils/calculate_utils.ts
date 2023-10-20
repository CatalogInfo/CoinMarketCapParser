import { BidsAsks, Order } from "../api/binance/binance_parse";

export default class CalculateUtils {
  static calculatePriceForLiquidity(liquiduty: number, bidsAsks: BidsAsks) {
    const bids: Order[] = bidsAsks.bids;
    const asks: Order[] = bidsAsks.asks;

    if (bids.length === 0) {
      return;
    }

    if (asks.length === 0) {
      return;
    }

    const bid = this.findPrice(bids, liquiduty);
    const ask = this.findPrice(asks, liquiduty);

    return {bid, ask};
  }

  private static findPrice(orders: Order[], liquiduty: number) {
    let tokensAmount = 0;
    let amountInUsdt = 0;

    orders.map((order: Order) => {
      if (amountInUsdt > liquiduty) {
        return;
      }

      const price: number = Number(order.price);
      const amount: number = Number(order.amount);

      tokensAmount = amount + tokensAmount;
      amountInUsdt = amountInUsdt + (amount * price)
    });

    return this.calculateFinalPrice(tokensAmount, amountInUsdt);
  }

  private static calculateFinalPrice(tokensAmount: number, amountInUsdt: number) {
    return Number(amountInUsdt)/Number(tokensAmount);
  }

}