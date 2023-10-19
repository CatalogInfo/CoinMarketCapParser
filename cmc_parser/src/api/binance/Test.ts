import api_factory from "../api_factory";

export default class Test {
  static async callApi() {
    return await api_factory.getInstance().get("https://api4.binance.com/api/v3/depth?symbol=BTCUSDT")
  }
}