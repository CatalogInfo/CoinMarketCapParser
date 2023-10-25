import api_factory from "../api_factory";
import BaseApiResponse from "../response/base_api_response";
import HuobiExchangeInfoResponse from "../response/huobi/huobi_exchange_info_response";
import HuobiOrderBookReponse from "../response/huobi/huobi_order_book_response";


export default class HuobiApi {
  static baseUrl = "https://api.huobi.pro";

  static async getOrderBook(symbol: string): Promise<BaseApiResponse<HuobiOrderBookReponse>> {
    return await api_factory.getInstance().get(`${this.baseUrl}/market/depth?symbol=${symbol}&type=step0`);
  }
  static async getExchangeInfo(): Promise<BaseApiResponse<HuobiExchangeInfoResponse>> {
    return await api_factory.getInstance().get(`${this.baseUrl}/v2/settings/common/symbols`);
  }
}