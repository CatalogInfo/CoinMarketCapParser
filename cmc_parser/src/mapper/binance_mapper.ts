import ExchangeMapper from "../api/exchange_mapper";
import BinanceExchangeInfoResponse from "../api/response/binance/binance_exchange_info_response";
import BinanceOrderBookResponse from "../api/response/binance/binance_order_book_response";
import BinanceSymbolResponse from "../api/response/binance/binance_symbol_response";
import { SymbolBaseQuote } from "../outputter/exchanges_data_types";

export default class BinanceMapper extends ExchangeMapper {
  static convertOrderBookResponseToBidsAsks(
    response: BinanceOrderBookResponse
  ) {
    return ExchangeMapper.convertOrderBookResponseToBidsAsksBase(response.bids, response.asks);
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