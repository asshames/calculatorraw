import { useState } from "react";
import "./App.scss";

const App = () => {
  const calNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const calOperators = ["+", "-", "*", "/", "="];

  const [tempDisplay, setTempDisplay] = useState("");
  const [currentOperand, setCurrentOperand] = useState("");
  const [operand, setOperand] = useState([]);
  const [operator, setOperator] = useState("");

  //handle the number click
  const handleOperandClick = (number) => {
    setCurrentOperand(parseInt(`${currentOperand}${number}`));
    setTempDisplay(`${tempDisplay}${number}`);
    if(operator === "+" || operator === "-" || operator === "*" || operator === "/") {
      setTempDisplay("");
      setOperator(1);
      setTempDisplay(number);
    }
  };

  //handle the calculation

  const handleCalculation = (operand) => {
    if (typeof operand[operand.length - 1] !== "number") {
      return;
    }
    // setTempDisplay(`${operand.join(" ")} = ${eval(operand.join(""))}`);
    setTempDisplay(`${eval(operand.join(" "))}`);
  };

  //handle the operator click
  const handleOperatorClick = (operator) => {
    const updatedOperand = [...operand];
    updatedOperand.push(currentOperand);
    setOperand(updatedOperand);
    setCurrentOperand("");
    setOperator(operator);

    if (operator === "=") {
      return handleCalculation(updatedOperand);
    } else {
      updatedOperand.push(operator);
      // setTempDisplay("");
    }
    // setTempDisplay(`${tempDisplay} ${operator} `);
  };

  return (
      <div className="App">
        <div className="Headline">
          <p>Calculator</p>
        </div>
        <div className="calculator-display">{tempDisplay}</div>
          <div className="calculator-options">
            <div className="calculator-options--left">
              {calNumbers.map((number) => (
                  <p key={number} onClick={() => handleOperandClick(number)}>
                    {number}
                  </p>
              ))}
            </div>
            <div className="calculator-options--right">
              {calOperators.map((operator) => (
                  <p key={operator} onClick={() => handleOperatorClick(operator)}>
                    {operator}
                  </p>
              ))}
            </div>
            <p
                onClick={() => {
                  setTempDisplay("");
                  setCurrentOperand("");
                  setOperand([]);
                }}
            >
              CLEAR
            </p>
          </div>
      </div>
  );
};

export default App;