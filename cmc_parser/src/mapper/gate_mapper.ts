import ExchangeMapper from "../api/exchange_mapper";
import GateExchangeInfoResponse from "../api/response/gate/gate_exchange_info_response";
import GateOrderBookReponse from "../api/response/gate/gate_order_book_response";
import GateSymbolResponse from "../api/response/gate/gate_symbol_response";
import { SymbolBaseQuote } from "../outputter/exchanges_data_types";

export default class GateMapper extends ExchangeMapper {
  static convertOrderBookResponseToBidsAsks(
    response: GateOrderBookReponse
  ) {
    return ExchangeMapper.convertOrderBookResponseToBidsAsksBase(response.bids, response.asks);
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