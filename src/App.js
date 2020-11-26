import React, {useState} from "react";
import "./App.css";

const App = () => {
  let [number, setNumber] = useState("0");
  let [expression, setExpression] = useState("");
  let [operator, setOperator] = useState("");
  let [result, setResult] = useState(null);
  let [error, setError] = useState(false);
  let [memory, setMemory] = useState("0");

  const buttonValues = ["AC", "+/-", "%", "/", "mc", "mr", "m-", "m+", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const operators = ["+", "-", "*", "/"];
  const errors = ["Infinity", "-Infinity", "NaN"];

  const rightColumnButtons = ["/", "m+", "*", "-", "+", "="];

  const handleClick = e => {
    let val = e.target.value;
    let isNumber = numbers.includes(val); // if clicked on a number
    let isOperator = operators.includes(val); // if clicked on a operator

    isNumber && setOperator("");
    isOperator && setOperator(val);

    if (val === "AC") {
      setNumber("0");
      setExpression("");
      setOperator("");
      setResult(null);
      setError(false);
      return;
    }
    if (val === "+/-") {
      setNumber(String(parseFloat(number || result.toString()) * -1));
      return;
    }
    if (val === "%") {
      // eslint-disable-next-line no-eval
      setNumber(String(parseFloat((eval(`${(number || result) / 100}`).toFixed(9).toString()))));
      return;
    }
    if (val === "0") {
      if (number === "0") {
        return;
      }
    }
    if (val === ".") {
      if (number.includes(val)) { // if the number contains "."
        return;
      }
      if (number === "") {
        setNumber("0.");
        return;
      }
      setNumber(number + val);
      return;
    }
    if (val === "=") {
      if ((parseFloat(number) === 0 && !expression) || !operators.includes(expression.slice(-1))) {
        return;
      }
      // eslint-disable-next-line no-eval
      let res = String(parseFloat(eval(`${result} ${expression.slice(-1)} ${number || result}`).toFixed(9).toString()));
      if (errors.includes(res)) {
        res === "NaN" && setNumber("Ошибка");
        setError(true);
        return res;
      }
      setNumber("");
      setExpression("");
      setOperator("");
      setResult(res);
      return;
    }

    if (val === "mc") {
      setMemory("0");
      return;
    }
    if (val === "mr") {
      setNumber(memory);
      return;
    }
    if (val === "m-") {
        // eslint-disable-next-line no-eval
        setMemory(String(parseFloat((eval(`${memory} - ${number || result}`).toFixed(9).toString()))));
      return;
    }
    if (val === "m+") {
      memory === "0" ? setMemory(number || result) :
        // eslint-disable-next-line no-eval
        setMemory(String(parseFloat((eval(`${memory} + ${number || result}`).toFixed(9).toString()))));
      return;
    }
    if (isNumber) {
      number === "" && operator === "" && setResult("");
      if (number === "0" || "") { // if the number is equal to "0" or "" and clicked 1-9
        setNumber(val);
        return;
      }
      setNumber(number + val);
      return;
    }
    if (isOperator) {
      if (val === operator) return;
      if (operator) {
        setExpression(expression.slice(0, -1) + val);
      } else {
        setExpression(expression + parseFloat(Number(number || result).toFixed(9)).toString() + val);

        number !== "" && setResult((prev) => {
          if (prev) {
            // eslint-disable-next-line no-eval
            let res = String(parseFloat((eval(`${prev} ${expression.slice(-1) || val} ${number}`).toFixed(9).toString())));
            if (errors.includes(res)) {
              res === "NaN" && setResult("Ошибка");
              setError(true);
              return res;
            } else {
              return res;
            }
          } else {
            // eslint-disable-next-line no-eval
            return String(parseFloat((eval(number).toFixed(9).toString())));
          }
        })
      }
      number !== "" && setNumber("");
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="memory">
          {memory !== "0" ? `M: ${memory}` : null}
        </div>
        <div
          className="number"
          style={(number.length > 8 || (result && result.length > 8)) ? {fontSize: 60 - (number.length || result.length) * 1.75} : null}
        >
          {number || result}
        </div>
        <div className="expression">{expression.length > 30 ? ("..." + expression.slice(expression.length - 30)) : expression}</div>
        <div className="buttonsWrapper">
          {buttonValues.map(val => (
            <button
              key={val}
              value={val}
              disabled={val !== "AC" ? error : false}
              className={rightColumnButtons.includes(val) ? "rightColumnButton" : null}
              onClick={handleClick}
            >
              {val === "*" ? "×" : val}
            </button>
          ))}
        </div>
        <div className="bottomLine" />
      </div>
    </div>
  );
};

export default App;