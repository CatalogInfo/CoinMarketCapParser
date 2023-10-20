export default class TimerUtils {
  static async sleep(time: number) {
    await new Promise(resolve => setTimeout(resolve, time));
  }
}