import TradingSymbol from "../../models/trading_symbol"
import CalculateUtils from "../../utils/calculate_utils";
import TimerUtils from "../../utils/timer_utils";
import BinanceExchangeInfoResponse from "../response/binance_exchange_info_response";
import BinanceOrderBookResponse from "../response/binance_order_book_response";
import BinanceSymbolResponse from "../response/binance_symbol_response";
import BinanceApi from "./binance_api";

export interface SymbolBaseQuote {
  baseAsset: string;
  quoteAsset: string;
}

export interface Order {
  price: number;
  amount: number;
}

export interface BidsAsks {
  bids: Order[]
  asks: Order[]
}

export default class BinanceParse {

  static tradingSymbols: TradingSymbol[] = [];
  static requiredQuoteAssets = ["USDT"]

  static async getBaseQuoteAssets(): Promise<SymbolBaseQuote[]> {
    const response: BinanceExchangeInfoResponse = await (await BinanceApi.getExchangeInfo()).data as BinanceExchangeInfoResponse;

    const symbols: SymbolBaseQuote[] = [];

    response.symbols.map((symbol: BinanceSymbolResponse) => {
      if(!this.requiredQuoteAssets.includes(symbol.quoteAsset)) {
        return;
      }
      symbols.push({baseAsset: symbol.baseAsset, quoteAsset: symbol.quoteAsset})
    });

    return symbols;
  }

  static async parseOrderBookTradingSymols() {
    const symbols = await this.getBaseQuoteAssets();

    symbols.map(async (symbol: SymbolBaseQuote) => {
      const fullSymbol = symbol.baseAsset + symbol.quoteAsset;

      const response: BinanceOrderBookResponse = await (await BinanceApi.getOrderBook(fullSymbol)).data as BinanceOrderBookResponse;

      const bidsAsks = this.convertOrderBookResponseToBidsAsks(response);

      const finalPrices = CalculateUtils.calculatePriceForLiquidity(2000, bidsAsks);

      await TimerUtils.sleep(200);
      console.log(finalPrices);
    });
  }

  private static convertOrderBookResponseToBidsAsks(response: BinanceOrderBookResponse) {
    const bidsAsks: BidsAsks = {bids: [], asks: []};

    this.addToBidsAsks(response.bids, bidsAsks.bids);
    this.addToBidsAsks(response.asks, bidsAsks.asks);

    return bidsAsks;
  }

  private static addToBidsAsks(limitsFromResponse: number[][], bidsAsksEntity: Order[]) {
    if(limitsFromResponse.length === 0) {
      return;
    }

    limitsFromResponse.map((value: number[]) => {
      const price = value[0];
      const amount = value[1];

      const order: Order = { price, amount };
      bidsAsksEntity.push(order);
    });
  }
}