import api_factory from "../api_factory";
import BaseApiResponse from "../response/base_api_response";
import MexcExchangeInfoResponse from "../response/mexc/mexc_exchange_info_response";
import MexcOrderBookResponse from "../response/mexc/mexc_order_book_response";


export default class MexcApi {
  static baseUrl = "https://api.mexc.com";

  static async getOrderBook(symbol: string): Promise<BaseApiResponse<MexcOrderBookResponse>> {
    return await api_factory.getInstance().get(`${this.baseUrl}/api/v3/depth?symbol=${symbol}`);
  }
  static async getExchangeInfo(): Promise<BaseApiResponse<MexcExchangeInfoResponse>> {
    return await api_factory.getInstance().get(`${this.baseUrl}/api/v3/exchangeInfo`);
  }
}