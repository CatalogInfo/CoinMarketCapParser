import TradingSymbol from "../../models/trading_symbol"
import BinanceExchangeInfoResponse from "../response/binance_exchange_info_response";
import BinanceOrderBookResponse from "../response/binance_order_book_response";
import BinanceSymbolResponse from "../response/binance_symbol_response";
import BinanceApi from "./binance_api";

export interface SymbolBaseQuote {
  baseAsset: string;
  quoteAsset: string;
}

export default class BinanceParse {

  static tradingSymbols: TradingSymbol[] = [];
  static requiredQuoteAssets = ["USDT", "ETH", "BTC"]

  static async getBaseQuoteAssets(): Promise<SymbolBaseQuote[]> {
    const response: BinanceExchangeInfoResponse = await (await BinanceApi.getExchangeInfo()).data as BinanceExchangeInfoResponse;

    const symbols: SymbolBaseQuote[] = [];

    response.symbols.map((symbol: BinanceSymbolResponse) => {
      this.requiredQuoteAssets.includes(symbol.quoteAsset)
      symbols.push({baseAsset: symbol.baseAsset, quoteAsset: symbol.quoteAsset})
    });

    return symbols;
  }

  static async parseOrderBookTradingSymols() {
    const response: BinanceOrderBookResponse = await (await BinanceApi.getExchangeInfo()).data as BinanceOrderBookResponse;
  }
}