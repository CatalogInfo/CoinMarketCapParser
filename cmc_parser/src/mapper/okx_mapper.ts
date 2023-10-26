import ExchangeMapper from "../api/exchange_mapper";
import OkxExchangeInfoResponse from "../api/response/okx/okx_exchange_info_response";
import { OkxOrderBook } from "../api/response/okx/okx_order_book_response";
import OkxSymbolResponse from "../api/response/okx/okx_symbol_response";
import { SymbolBaseQuote } from "../outputter/exchanges_data_types";

export default class OkxMapper extends ExchangeMapper{
  static convertOrderBookResponseToBidsAsks(
    response: OkxOrderBook
  ) {
    return this.convertOrderBookResponseToBidsAsksBase(response.bids, response.asks);
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