import OkxExchangeInfoResponse from "../api/response/okx/okx_exchange_info_response";
import { OkxOrderBook } from "../api/response/okx/okx_order_book_response";
import OkxSymbolResponse from "../api/response/okx/okx_symbol_response";
import { BidsAsks, Order, SymbolBaseQuote } from "../outputter/exchanges_data_types";

export default class OkxMapper {
  static convertOrderBookResponseToBidsAsks(
    response: OkxOrderBook
  ) {
    const bidsAsks: BidsAsks = { bids: [], asks: [] };

    this.addToBidsAsks(response.bids, bidsAsks.bids);
    this.addToBidsAsks(response.asks, bidsAsks.asks);

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

  static convertAssetsToSymbolQouteBase(tradingPairs: OkxExchangeInfoResponse, requiredQuoteAssets: string[]) {
    const symbols: SymbolBaseQuote[] = [];

    tradingPairs.data.map((symbol: OkxSymbolResponse) => {
      if (!requiredQuoteAssets.includes(symbol.quoteCcy)) {
        return;
      }

      symbols.push({
        baseAsset: symbol.baseCcy,
        quoteAsset: symbol.quoteCcy,
      });
    });

    return symbols;
  }
}