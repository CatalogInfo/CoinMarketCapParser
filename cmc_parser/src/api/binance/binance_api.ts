import api_factory from "../api_factory";
import BaseApiResponse from "../response/base_api_response";

export default class BinanceApi {
  static baseUrl = "https://api4.binance.com/api/v3";

  static async getOrderBook<T>(symbol: string): Promise<BaseApiResponse<T>> {
    return await api_factory.getInstance().get(`${this.baseUrl}/depth?symbol=${symbol}`);
  }
  static async getExchangeInfo<T>(): Promise<BaseApiResponse<T>> {
    return await api_factory.getInstance().get(`${this.baseUrl}/exchangeInfo`);
  }
}