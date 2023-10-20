interface Bid {
  bid: [];
}

interface Ask {
  ask: [];
}

export default interface BinanceOrderBookResponse {
  bids: Bid[];
  asks: Ask[];
}