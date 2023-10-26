import ExchangeMapper from "../api/exchange_mapper";
import HuobiExchangeInfoResponse from "../api/response/huobi/huobi_exchange_info_response";
import HuobiOrderBookReponse from "../api/response/huobi/huobi_order_book_response";
import HuobiSymbolResponse from "../api/response/huobi/huobi_symbol_response";
import { SymbolBaseQuote } from "../outputter/exchanges_data_types";

export default class HuobiMapper extends ExchangeMapper  {
  static convertOrderBookResponseToBidsAsks(
    response: HuobiOrderBookReponse
  ) {
    return ExchangeMapper.convertOrderBookResponseToBidsAsksBase(response.tick?.bids, response.tick?.asks);
  }

  static convertAssetsToSymbolQouteBase(tradingPairs: HuobiExchangeInfoResponse, requiredQuoteAssets: string[]) {
    const symbols: SymbolBaseQuote[] = [];
    tradingPairs.data.map((symbol: HuobiSymbolResponse) => {
      if (!requiredQuoteAssets.includes(symbol.qcdn) || symbol.state !== "online"  ) {
        return;
      }

      symbols.push({
        baseAsset: symbol.bcdn.toUpperCase(),
        quoteAsset: symbol.qcdn.toUpperCase(),
      });

    });
    return symbols;
  }
}