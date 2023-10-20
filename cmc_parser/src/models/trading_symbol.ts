export default interface TradingSymbol {
  baseAsset: string;
  quoteAsset: string;
  fullName: string | null;
  bid: number;
  ask: number;
}