import { useState } from 'react'
import Test from './api/binance/Test'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [res, setRes] = useState("");
  async function callApi() {
    setRes(JSON.stringify(await Test.callApi()));
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
