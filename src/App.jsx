import { useState } from "react";
import "./App.css";

function App() {
  const [expression, setExpression] = useState("");
  const [display, setDisplay] = useState("0");
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNumber, setWaitingForNumber] = useState(false);
  const inputNumber = (number) => {
  if (display === "Error" || waitingForNumber) {
    setDisplay(number);
    setWaitingForNumber(false);
  } else {
    setDisplay(display === "0" ? number : display + number);
  }

  setExpression((prev) => prev + number);
  // setExpression((prev) => prev + ` ${nextOperator} `);
};
// setExpression((prev) => prev + ` ${nextOperator} `);

 

  const inputDecimal = () => {
    if (display === "Error" || waitingForNumber) {
      setDisplay("0.");
      setWaitingForNumber(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clearCalculator = () => {
  setDisplay("0");
  setExpression("");
  setFirstNumber(null);
  setOperator(null);
  setWaitingForNumber(false);
};

  const performCalculation = (first, second, selectedOperator) => {
    switch (selectedOperator) {
      case "+":
        return first + second;

      case "-":
        return first - second;

      case "*":
        return first * second;

      case "/":
        if (second === 0) {
          return "Error";
        }
        return first / second;

      default:
        return second;
    }
  };

  const chooseOperator = (nextOperator) => {
  if (display === "Error") return;

  const currentNumber = parseFloat(display);

  if (firstNumber === null) {
    setFirstNumber(currentNumber);
  }

  setOperator(nextOperator);
  setWaitingForNumber(true);

  setExpression((prev) => prev + ` ${nextOperator} `);
};

  const calculateResult = () => {
  if (
    firstNumber === null ||
    operator === null ||
    waitingForNumber ||
    display === "Error"
  ) {
    return;
  }

  const secondNumber = parseFloat(display);

  const result = performCalculation(
    firstNumber,
    secondNumber,
    operator
  );

  setDisplay(String(result));
  setExpression((prev) => prev + ` = ${result}`);

  setFirstNumber(null);
  setOperator(null);
  setWaitingForNumber(true);
};

  return (
    <div className="app">
      <div className="calculator">
        <div className="display-container">
  <div className="expression">{expression}</div>
  <div className="display">{display}</div>
</div>
        {/* <div className="display">{display}</div> */}

        <div className="buttons">
          <button
            className="clear"
            onClick={clearCalculator}
          >
            AC
          </button>

          <button
            className="operator"
            onClick={() => chooseOperator("/")}
          >
            ÷
          </button>

          <button onClick={() => inputNumber("7")}>7</button>
          <button onClick={() => inputNumber("8")}>8</button>
          <button onClick={() => inputNumber("9")}>9</button>

          <button
            className="operator"
            onClick={() => chooseOperator("*")}
          >
            ×
          </button>

          <button onClick={() => inputNumber("4")}>4</button>
          <button onClick={() => inputNumber("5")}>5</button>
          <button onClick={() => inputNumber("6")}>6</button>

          <button
            className="operator"
            onClick={() => chooseOperator("-")}
          >
            −
          </button>

          <button onClick={() => inputNumber("1")}>1</button>
          <button onClick={() => inputNumber("2")}>2</button>
          <button onClick={() => inputNumber("3")}>3</button>

          <button
            className="operator"
            onClick={() => chooseOperator("+")}
          >
            +
          </button>

          <button
            className="zero"
            onClick={() => inputNumber("0")}
          >
            0
          </button>

          <button onClick={inputDecimal}>.</button>

          <button
            className="equals"
            onClick={calculateResult}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;