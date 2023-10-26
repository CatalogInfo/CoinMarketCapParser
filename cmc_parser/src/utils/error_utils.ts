export default class ErrorUtils {
  private static RATE_LIMIT_STATUS = 429;

  static defineError(status: number) {
    if (status === this.RATE_LIMIT_STATUS) {
      console.log("BAAAAAAAAAAAAAAAAAN!")
      this.throwBanError();
    }
  }

  private static throwBanError() {
    throw new Error("You were banned idiot!")
  }
}