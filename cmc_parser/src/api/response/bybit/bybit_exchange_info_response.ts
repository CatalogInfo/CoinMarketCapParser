import BybitSymbolResponse from "./bybit_symbol_response";

export default interface BybitExchangeInfoResponse {
  result: {
    list: BybitSymbolResponse[];
  }
}