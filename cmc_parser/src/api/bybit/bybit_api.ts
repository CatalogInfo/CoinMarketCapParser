import api_factory from "../api_factory";
import BaseApiResponse from "../response/base_api_response";
import BybitExchangeInfoResponse from "../response/bybit/bybit_exchange_info_response";
import BybitOrderBookResponse from "../response/bybit/bybit_order_book_response";

export default class BybitApi {
  static baseUrl = "https://api.bybit.com/v5/market";

  static async getOrderBook(symbol: string): Promise<BaseApiResponse<BybitOrderBookResponse>> {
    return await api_factory.getInstance().get(`${this.baseUrl}/orderbook?category=spot&symbol=${symbol}&limit=50`);
  }
  static async getExchangeInfo(): Promise<BaseApiResponse<BybitExchangeInfoResponse>> {
    return await api_factory.getInstance().get(`${this.baseUrl}/instruments-info?category=spot`);
  }
}