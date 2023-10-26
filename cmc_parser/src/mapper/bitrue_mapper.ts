import BitrueExchangeInfoResponse from "../api/response/bitrue/bitrue_exchange_info_response";
import BitrueOrderBookResponse from "../api/response/bitrue/bitrue_order_book_response";
import BitrueSymbolResponse from "../api/response/bitrue/bitrue_symbol_response";
import { BidsAsks, Order, SymbolBaseQuote } from "../outputter/exchanges_data_types";

export default class BitrueMapper {
  static convertOrderBookResponseToBidsAsks(
    response: BitrueOrderBookResponse
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

  static convertAssetsToSymbolQouteBase(tradingPairs: BitrueExchangeInfoResponse, requiredQuoteAssets: string[]) {
    const symbols: SymbolBaseQuote[] = [];


    tradingPairs.symbols.map((symbol: BitrueSymbolResponse) => {
      if (!requiredQuoteAssets.includes(symbol.quoteAsset.toUpperCase())) {
        return;
      }

      symbols.push({
        baseAsset: symbol.baseAsset.toUpperCase(),
        quoteAsset: symbol.quoteAsset.toUpperCase(),
      });
    });
  

    return symbols;
  }
}