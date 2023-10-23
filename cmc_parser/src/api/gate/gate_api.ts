import api_factory from "../api_factory";
import BaseApiResponse from "../response/base_api_response";
import GateExchangeInfoResponse from "../response/gate_exchange_info_response";
import GateOrderBookReponse from "../response/gate_order_book_response";

export default class GateApi {
  static baseUrl = "https://api.gateio.ws/api/v4";

  static async getOrderBook(symbol: string): Promise<BaseApiResponse<GateOrderBookReponse>> {
    return await api_factory.getInstance().get(`${this.baseUrl}/spot/order_book?currency_pair=${symbol}`);
  }
  static async getExchangeInfo(): Promise<BaseApiResponse<GateExchangeInfoResponse>> {
    return await api_factory.getInstance().get(`${this.baseUrl}/spot/currency_pairs`);
  }
}