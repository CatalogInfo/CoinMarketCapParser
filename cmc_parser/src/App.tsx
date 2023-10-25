import "./App.css";
import HuobiParse from "./api/huobi/huobi_parse";
import ExchangeParser from "./api/exchange_parser";

function App() {
  async function callApi() {
    const parse: ExchangeParser = new HuobiParse();
    console.log(await parse.parseOrderBookTradingSymols());
  }

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <button
          className="font-bold bg-indigo-300 rounded-2xl hover:bg-indigo-400 shadow-xl px-3 py-1"
          onClick={callApi}
        >
          Run devil machine!
        </button>
      </div>
    </>
  );
}

export default App;
