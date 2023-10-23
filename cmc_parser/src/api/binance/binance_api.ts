import api_factory from "../api_factory";
import BaseApiResponse from "../response/base_api_response";
import BinanceExchangeInfoResponse from "../response/binance_exchange_info_response";
import BinanceOrderBookResponse from "../response/binance_order_book_response";

export default class BinanceApi {
  static baseUrl = "https://api4.binance.com/api/v3";

  static async getOrderBook(symbol: string): Promise<BaseApiResponse<BinanceOrderBookResponse>> {
    return await api_factory.getInstance().get(`${this.baseUrl}/depth?symbol=${symbol}`);
  }
  static async getExchangeInfo(): Promise<BaseApiResponse<BinanceExchangeInfoResponse>> {
    return await api_factory.getInstance().get(`${this.baseUrl}/exchangeInfo`);
  }
}