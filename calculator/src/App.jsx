import React, { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedinput = localStorage.getItem("calculatorInput");
    if (savedinput) {
      setInput(savedinput);
    }
  }, [])
  
  useEffect(()=>{
    if (input !== "") {
      localStorage.setItem("calculatorInput", input);
    }
  },[input])

  const handleClear = () => {
    setInput("");
    localStorage.removeItem("calculatorInput");
  };

  const handleClick = (value) => {
    setInput(input + value);
  };

  const handleCalculate = () => {
    try {
      // Handle Square Root
      let calcInput = input.replace(/√/g, "Math.sqrt(");
      
      // Handle Percentage
      calcInput = calcInput.replace(/%/g, "/100");
      
      // Ensure closing the parentheses for sqrt() if necessary
      if (calcInput.includes("Math.sqrt(")) {
        calcInput += ")";
      }

      // Evaluate the final expression
      setInput(eval(calcInput).toString());
    } catch (error) {
      setInput("error");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-80 bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4 bg-gray-800 text-white text-3xl p-4 rounded-lg text-right">
          {input || "0"}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {/* Clear Button */}
          <button
            onClick={handleClear}
            className="col-span-2 bg-red-500 text-white py-4 rounded-lg text-xl hover:bg-red-600 transition duration-200"
          >
            C
          </button>
          {/* Operators */}
          <button
            onClick={() => handleClick("/")}
            className="bg-gray-200 py-4 rounded-lg text-xl hover:bg-gray-300 transition duration-200"
          >
            ÷
          </button>
          <button
            onClick={() => handleClick("*")}
            className="bg-gray-200 py-4 rounded-lg text-xl hover:bg-gray-300 transition duration-200"
          >
            ×
          </button>
          {/* Numbers */}
          <button
            onClick={() => handleClick("7")}
            className="bg-gray-100 py-4 rounded-lg text-xl hover:bg-gray-200 transition duration-200"
          >
            7
          </button>
          <button
            onClick={() => handleClick("8")}
            className="bg-gray-100 py-4 rounded-lg text-xl hover:bg-gray-200 transition duration-200"
          >
            8
          </button>
          <button
            onClick={() => handleClick("9")}
            className="bg-gray-100 py-4 rounded-lg text-xl hover:bg-gray-200 transition duration-200"
          >
            9
          </button>
          <button
            onClick={() => handleClick("-")}
            className="bg-gray-200 py-4 rounded-lg text-xl hover:bg-gray-300 transition duration-200"
          >
            −
          </button>
          <button
            onClick={() => handleClick("4")}
            className="bg-gray-100 py-4 rounded-lg text-xl hover:bg-gray-200 transition duration-200"
          >
            4
          </button>
          <button
            onClick={() => handleClick("5")}
            className="bg-gray-100 py-4 rounded-lg text-xl hover:bg-gray-200 transition duration-200"
          >
            5
          </button>
          <button
            onClick={() => handleClick("6")}
            className="bg-gray-100 py-4 rounded-lg text-xl hover:bg-gray-200 transition duration-200"
          >
            6
          </button>
          <button
            onClick={() => handleClick("+")}
            className="bg-gray-200 py-4 rounded-lg text-xl hover:bg-gray-300 transition duration-200"
          >
            +
          </button>
          <button
            onClick={() => handleClick("1")}
            className="bg-gray-100 py-4 rounded-lg text-xl hover:bg-gray-200 transition duration-200"
          >
            1
          </button>
          <button
            onClick={() => handleClick("2")}
            className="bg-gray-100 py-4 rounded-lg text-xl hover:bg-gray-200 transition duration-200"
          >
            2
          </button>
          <button
            onClick={() => handleClick("3")}
            className="bg-gray-100 py-4 rounded-lg text-xl hover:bg-gray-200 transition duration-200"
          >
            3
          </button>
          <button
            onClick={() => handleClick("%")}
            className="bg-gray-200 py-4 rounded-lg text-xl hover:bg-gray-300 transition duration-200"
          >
            %
          </button>
          <button
            onClick={() => handleClick("0")}
            className="bg-gray-100 py-4 rounded-lg text-xl hover:bg-gray-200 transition duration-200"
          >
            0
          </button>
          <button
            onClick={() => handleClick(".")}
            className="bg-gray-100 py-4 rounded-lg text-xl hover:bg-gray-200 transition duration-200"
          >
            .
          </button>
          {/* Special Functions */}
          <button
            onClick={() => handleClick("√")}
            className="bg-gray-200 py-4 rounded-lg text-xl hover:bg-gray-300 transition duration-200"
          >
            √
          </button>
          
          <button
            onClick={handleCalculate}
            className="bg-green-500 text-white py-4 rounded-lg text-xl hover:bg-green-600 transition duration-200"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
