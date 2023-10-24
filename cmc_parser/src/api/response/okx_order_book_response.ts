export interface OkxOrderBook {
  bids: number[][];
  asks: number[][];
}

export default interface OkxOrderBookResponse {
  data: OkxOrderBook[];
}