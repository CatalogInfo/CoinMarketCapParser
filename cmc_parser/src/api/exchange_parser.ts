export default abstract class ExchangeApi {
  async parseOrderBookTradingSymols() {
    const symbols = await this.getBaseQuoteAssets();

    for (let i = 0; i < symbols.length; i++) {
      this.asyncCalsuls(symbols[i]);
      await TimerUtils.sleep(200);
    }
  }

  abstract asyncCalsuls();
}