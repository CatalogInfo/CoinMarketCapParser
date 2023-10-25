import TradingSymbol from "../../models/trading_symbol";
import BinanceParse from "../binance/binance_parse";
import ExchangeParser from "../exchange_parser";
// import HuobiParse from "../huobi/huobi_parse";
import OkxParse from "../okx/okx_parse";

export default class Splitter {
  
  static exchanges: ExchangeParser[] = [];

  private static init() {
    this.exchanges.push(new BinanceParse);
    this.exchanges.push(new OkxParse);
    // this.exchanges.push(new HuobiParse);
  }

  static async split() {
    this.init();

    const parseProccess = () => new Promise(() => {
        this.exchanges.map((exc: ExchangeParser) => {
          exc.parseOrderBookTradingSymols();
        });
    });

    await parseProccess();

    // let j = 0;
    // for(let i = 0; i < this.exchanges.length; i ++) {
      
    // }
    console.log(this.compareSymbols(this.exchanges[0].tradingSymbols, this.exchanges[1].tradingSymbols))
  }

  private static compareSymbols(tradingSymbols1: TradingSymbol[], tradingSymbols2: TradingSymbol[]) {
    const result = tradingSymbols1.map(el => {
      tradingSymbols2.map(el1 => {
        console.log(el.baseAsset + el.quoteAsset)
        if((el.baseAsset + el.quoteAsset) === (el1.baseAsset + el1.quoteAsset)) {
          return el;
        }
      })
    })

    return result;
  }
}