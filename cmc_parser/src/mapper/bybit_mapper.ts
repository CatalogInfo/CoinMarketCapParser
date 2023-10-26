import ExchangeMapper from "../api/exchange_mapper";
import BybitExchangeInfoResponse from "../api/response/bybit/bybit_exchange_info_response";
import BybitOrderBookResponse from "../api/response/bybit/bybit_order_book_response";
import BybitSymbolResponse from "../api/response/bybit/bybit_symbol_response";
import { SymbolBaseQuote } from "../outputter/exchanges_data_types";

export default class BybitMapper extends ExchangeMapper {
  static convertOrderBookResponseToBidsAsks(
    response: BybitOrderBookResponse
  ) {
    return ExchangeMapper.convertOrderBookResponseToBidsAsksBase(response.result?.b, response.result?.a);
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