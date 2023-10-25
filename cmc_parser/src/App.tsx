import { useState } from 'react'
// import OkxParse from './api/okx/okx_parse';
// import Splitter from './api/splitter/splitter';
import './App.css'
import HuobiParse from './api/huobi/huobi_parse';
import ExchangeParser from './api/exchange_parser';

function App() {
  const [res, setRes] = useState("");

  async function callApi() {
    
    // const respose = await Splitter.split();
    // setRes(JSON.stringify(await BinanceParse.parseOrderBookTradingSymols()));  
    const parse: ExchangeParser = new HuobiParse();
    console.log(await parse.parseOrderBookTradingSymols());
  }

  return (
    <>
    <div className="font-bold underline" onClick={callApi}>
      MNIUYVHIOJPIUVY
      {res}
    </div>
    </>
  )
}

export default App
