export default interface HuobiOrderBookReponse {
  tick: {
    bids: number[][];
    asks: number[][];
  }
}