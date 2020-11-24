import React, {useState} from "react";
import "./App.css";

const App = () => {
  let [number, setNumber] = useState("0");
  let [fakeNumber, setFakeNumber] = useState("0");
  let [result, setResult] = useState("");

  const buttonValues = ["AC", "+/-", "%", "/", "mc", "mr", "m-", "m+", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  const handleClick = e => {
    let val = e.target.value;

  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="number">{number || fakeNumber}</div>
        <div className="result">{result}</div>
        {buttonValues.map(val => <button value={val} onClick={handleClick}>{val}</button>)}
      </div>
    </div>
  );
};

export default App;