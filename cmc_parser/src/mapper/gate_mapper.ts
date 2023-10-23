import GateExchangeInfoResponse from "../api/response/gate_exchange_info_response";
import GateOrderBookReponse from "../api/response/gate_order_book_response";
import GateSymbolResponse from "../api/response/gate_symbol_response";
import { BidsAsks, Order, SymbolBaseQuote } from "../outputter/exchanges_data_types";

export default class GateMapper {
  static convertOrderBookResponseToBidsAsks(
    response: GateOrderBookReponse
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

  static convertAssetsToSymbolQouteBase(tradingPairs: GateExchangeInfoResponse, requiredQuoteAssets: string[]) {
    const symbols: SymbolBaseQuote[] = [];

    tradingPairs.symbols.map((symbol: GateSymbolResponse) => {
      if (!requiredQuoteAssets.includes(symbol.quote)) {
        return;
      }

      symbols.push({
        baseAsset: symbol.base,
        quoteAsset: symbol.quote,
      });
    });

    return symbols;
  }
}