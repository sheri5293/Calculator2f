/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Button from "./Button";
import Display from "./Display";
import { evaluate } from "mathjs";

const Calculator = () => {
  const [value, setValue] = useState("0");
  const [OperatorPressed, setOperatorPressed] = useState(false);

  const handleClick = (e) => {
    const { id } = e.target;

    if (id === "equals") {
      try {
        const result = evaluate(value);
        setValue(formatResult(result));
      } catch {
        setValue("Error");
      }
      setOperatorPressed(false);
    } else if (id === "clear") {
      setValue("0");
      setOperatorPressed(false);
    } else if (id === "decimal") {
      setValue((prev) => {
        if (OperatorPressed) {
          return prev + "0.";
        }
        const lastNumber = prev.split(/[\\+\-\\*\\/]/).pop();
        return lastNumber.includes(".") ? prev : prev + ".";
      });
      setOperatorPressed(false);
    } else if (["add", "subtract", "multiply", "divide"].includes(id)) {
      setValue((prev) => {
        if (OperatorPressed) {
          return prev.slice(0, -1) + Symbol(id);
        }

        return prev + ` ${Symbol(id)} `;
      });
      setOperatorPressed(true);
    } else {
      if (OperatorPressed) {
        setValue(id);
      } else {
        setValue((prev) => {
          if (prev === "0" && id !== "0") {
            return id;
          }
          return prev + id;
        });
      }
      setOperatorPressed(false);
    }
  };

  const Symbol = (operator) => {
    switch (operator) {
      case "add":
        return "+";
      case "subtract":
        return "-";
      case "multiply":
        return "*";
      case "divide":
        return "/";
      default:
        return "";
    }
  };

  const formatResult = (result) => {
    return Number(result)
      .toFixed(4)
      .replace(/\.?0+$/, "");
  };

  return (
    <div className="calculator">
      <Display value={value} />
      <div className="buttons">
        <Button id="clear" onClick={handleClick}>
          C
        </Button>
        <Button id="decimal" onClick={handleClick}>
          .
        </Button>
        <Button id="zero" onClick={handleClick}>
          0
        </Button>
        <Button id="one" onClick={handleClick}>
          1
        </Button>
        <Button id="two" onClick={handleClick}>
          2
        </Button>
        <Button id="three" onClick={handleClick}>
          3
        </Button>
        <Button id="four" onClick={handleClick}>
          4
        </Button>
        <Button id="five" onClick={handleClick}>
          5
        </Button>
        <Button id="six" onClick={handleClick}>
          6
        </Button>
        <Button id="seven" onClick={handleClick}>
          7
        </Button>
        <Button id="eight" onClick={handleClick}>
          8
        </Button>
        <Button id="nine" onClick={handleClick}>
          9
        </Button>
        <Button id="add" onClick={handleClick}>
          +
        </Button>
        <Button id="subtract" onClick={handleClick}>
          -
        </Button>
        <Button id="multiply" onClick={handleClick}>
          *
        </Button>
        <Button id="divide" onClick={handleClick}>
          /
        </Button>
        <Button id="equals" onClick={handleClick}>
          =
        </Button>
      </div>
    </div>
  );
};

export default Calculator;
