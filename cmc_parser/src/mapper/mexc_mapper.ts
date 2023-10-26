import MexcExchangeInfoResponse from "../api/response/mexc/mexc_exchange_info_response";
import MexcOrderBookResponse from "../api/response/mexc/mexc_order_book_response";
import MexcSymbolResponse from "../api/response/mexc/mexc_symbol_response";
import { BidsAsks, Order, SymbolBaseQuote } from "../outputter/exchanges_data_types";

export default class MexcMapper {
  static convertOrderBookResponseToBidsAsks(
    response: MexcOrderBookResponse
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

  static convertAssetsToSymbolQouteBase(tradingPairs: MexcExchangeInfoResponse, requiredQuoteAssets: string[]) {
    const symbols: SymbolBaseQuote[] = [];

    tradingPairs.symbols.map((symbol: MexcSymbolResponse) => {
      if (!requiredQuoteAssets.includes(symbol.quoteAsset)) {
        return;
      }

      symbols.push({
        baseAsset: symbol.baseAsset,
        quoteAsset: symbol.quoteAsset,
      });
    });

    return symbols;
  }
}