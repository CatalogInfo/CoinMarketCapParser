import ExchangeMapper from "../api/exchange_mapper";
import BitrueExchangeInfoResponse from "../api/response/bitrue/bitrue_exchange_info_response";
import BitrueOrderBookResponse from "../api/response/bitrue/bitrue_order_book_response";
import BitrueSymbolResponse from "../api/response/bitrue/bitrue_symbol_response";
import { SymbolBaseQuote } from "../outputter/exchanges_data_types";

export default class BitrueMapper extends ExchangeMapper {
  static convertOrderBookResponseToBidsAsks(
    response: BitrueOrderBookResponse
  ) {
    return ExchangeMapper.convertOrderBookResponseToBidsAsksBase(response.bids, response.asks);
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