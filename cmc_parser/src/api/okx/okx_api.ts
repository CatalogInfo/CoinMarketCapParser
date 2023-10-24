import api_factory from "../api_factory";
import BaseApiResponse from "../response/base_api_response";
import OkxExchangeInfoResponse from "../response/okx/okx_exchange_info_response";
import OkxOrderBookResponse from "../response/okx/okx_order_book_response";

export default class OkxApi {
  static baseUrl = "https://www.okx.com";

  static async getOrderBook(symbol: string): Promise<BaseApiResponse<OkxOrderBookResponse>> {
    return await api_factory.getInstance().get(`${this.baseUrl}/api/v5/market/books?instId=${symbol}&sz=100`);
  }
  static async getExchangeInfo(): Promise<BaseApiResponse<OkxExchangeInfoResponse>> {
    return await api_factory.getInstance().get(`${this.baseUrl}/api/v5/public/instruments?instType=SPOT`);
  }
}