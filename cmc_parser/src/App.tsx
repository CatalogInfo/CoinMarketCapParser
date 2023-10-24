import { useState } from 'react'
import OkxParse from './api/okx/okx_parse';
import Splitter from './api/splitter/splitter';
import './App.css'

function App() {
  const [res, setRes] = useState("");

  async function callApi() {
    
    const respose = await Splitter.split();
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
