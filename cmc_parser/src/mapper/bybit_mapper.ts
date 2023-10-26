import BybitExchangeInfoResponse from "../api/response/bybit/bybit_exchange_info_response";
import BybitOrderBookResponse from "../api/response/bybit/bybit_order_book_response";
import BybitSymbolResponse from "../api/response/bybit/bybit_symbol_response";
import { BidsAsks, Order, SymbolBaseQuote } from "../outputter/exchanges_data_types";

export default class BybitMapper {
  static convertOrderBookResponseToBidsAsks(
    response: BybitOrderBookResponse
  ) {
    const bidsAsks: BidsAsks = { bids: [], asks: [] };

    this.addToBidsAsks(response.result?.b, bidsAsks.bids);
    this.addToBidsAsks(response.result?.a, bidsAsks.asks);

    return bidsAsks;
  }

  private static addToBidsAsks(
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

  static convertAssetsToSymbolQouteBase(tradingPairs: BybitExchangeInfoResponse, requiredQuoteAssets: string[]) {
    const symbols: SymbolBaseQuote[] = [];

    tradingPairs.result.list.map((symbol: BybitSymbolResponse) => {
      if (!requiredQuoteAssets.includes(symbol.quoteCoin)) {
        return;
      }

      symbols.push({
        baseAsset: symbol.baseCoin,
        quoteAsset: symbol.quoteCoin,
      });
    });

    return symbols;
  }
}