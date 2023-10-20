import BaseApiResponse from "../response/base_api_response";

export default interface IDataFetch {
  getExchangeInfo<T>(): Promise<BaseApiResponse<T>>;
  getOrderBook<K>(symbol: string): Promise<BaseApiResponse<K>>;
}