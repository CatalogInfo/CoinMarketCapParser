import BinanceExchangeInfoResponse from "../api/response/binance_exchange_info_response";
import BinanceOrderBookResponse from "../api/response/binance_order_book_response";
import BinanceSymbolResponse from "../api/response/binance_symbol_response";
import { BidsAsks, Order, SymbolBaseQuote } from "../outputter/exchanges_data_types";

export default class BinanceMapper {
  static convertOrderBookResponseToBidsAsks(
    response: BinanceOrderBookResponse
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

  static convertAssetsToSymbolQouteBase(tradingPairs: BinanceExchangeInfoResponse, requiredQuoteAssets: string[]) {
    const symbols: SymbolBaseQuote[] = [];

    tradingPairs.symbols.map((symbol: BinanceSymbolResponse) => {
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