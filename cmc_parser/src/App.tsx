import Splitter from "./api/splitter/splitter";
import "./App.css";

function App() {
  async function callApi() {
    await Splitter.split();
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
  );;
}

export default App;;
