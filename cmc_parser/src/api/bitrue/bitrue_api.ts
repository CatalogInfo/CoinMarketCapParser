import api_factory from "../api_factory";
import BaseApiResponse from "../response/base_api_response";
import BitrueExchangeInfoResponse from "../response/bitrue/bitrue_exchange_info_response";
import BitrueOrderBookResponse from "../response/bitrue/bitrue_order_book_response";

export default class BitrueApi {
  static baseUrl = "https://openapi.bitrue.com";

  static async getOrderBook(symbol: string): Promise<BaseApiResponse<BitrueOrderBookResponse>> {
    return await api_factory.getInstance().get(`${this.baseUrl}/api/v1/depth?symbol=${symbol}`);
  }
  static async getExchangeInfo(): Promise<BaseApiResponse<BitrueExchangeInfoResponse>> {
    return await api_factory.getInstance().get(`${this.baseUrl}/api/v1/exchangeInfo`);
  }
}