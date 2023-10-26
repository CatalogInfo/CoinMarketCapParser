import ExchangeMapper from "../api/exchange_mapper";
import MexcExchangeInfoResponse from "../api/response/mexc/mexc_exchange_info_response";
import MexcOrderBookResponse from "../api/response/mexc/mexc_order_book_response";
import MexcSymbolResponse from "../api/response/mexc/mexc_symbol_response";
import { SymbolBaseQuote } from "../outputter/exchanges_data_types";

export default class MexcMapper extends ExchangeMapper {
  static convertOrderBookResponseToBidsAsks(
    response: MexcOrderBookResponse
  ) {
    return ExchangeMapper.convertOrderBookResponseToBidsAsksBase(response.bids, response.asks);
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