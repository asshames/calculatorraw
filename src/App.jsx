import { Fragment, useState } from "react";
import "./App.scss";

const App = () => {
  const calNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const calOperators = ["+", "-", "*", "/", "="];

  const [tempDisplay, setTempDisplay] = useState("");
  const [currentOperand, setCurrentOperand] = useState("");
  const [operand, setOperand] = useState([]);

  const handleOperandClick = (number) => {
    setCurrentOperand(parseInt(`${currentOperand}${number}`));
    setTempDisplay(`${tempDisplay}${number}`);
  };

  const handleCalculation = (operand) => {
    if (typeof operand[operand.length - 1] !== "number") {
      return;
    }

    setTempDisplay(`${operand.join(" ")} = ${eval(operand.join(""))}`);
  };

  const handleOperatorClick = (operator) => {
    const updatedOperand = [...operand];
    updatedOperand.push(currentOperand);
    setOperand(updatedOperand);
    setCurrentOperand("");

    if (operator === "=") {
      return handleCalculation(updatedOperand);
    } else {
      updatedOperand.push(operator);
    }

    setTempDisplay(`${tempDisplay} ${operator} `);
  };

  return (
      <div className="App">
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