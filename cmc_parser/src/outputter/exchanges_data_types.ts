export interface SymbolBaseQuote {
  baseAsset: string;
  quoteAsset: string;
}

export interface Order {
  price: number;
  amount: number;
}

export interface BidsAsks {
  bids: Order[];
  asks: Order[];
}