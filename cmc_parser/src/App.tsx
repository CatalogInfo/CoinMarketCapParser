import { useState } from 'react'
import BinanceApi from './api/binance/binance_api';
import BinanceExchangeInfoResponse from './api/response/binance_exchange_info_response';
import './App.css'

function App() {
  const [res, setRes] = useState("");

  async function callApi() {
    setRes(JSON.stringify(await BinanceApi.getExchangeInfo<BinanceExchangeInfoResponse>()));
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
