import { useState } from 'react'
import BinanceParse from './api/binance/binance_parse';
import GateParse from './api/gate/gate_parse';
import './App.css'

function App() {
  const [res, setRes] = useState("");

  async function callApi() {
    const res = await GateParse.parseOrderBookTradingSymols();
    console.log(res);
    // setRes(JSON.stringify(await BinanceParse.parseOrderBookTradingSymols()));
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
