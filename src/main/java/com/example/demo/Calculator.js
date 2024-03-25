import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleNumChange = (e, num) => {
    const { value } = e.target;
    num === 1 ? setNum1(value) : setNum2(value);
  };

  const handleOperation = (e) => {
    setOperation(e.target.value);
  };

  const calculateResult = async () => {
    // Parse input values
    const parsedNum1 = parseInt(num1);
    const parsedNum2 = parseInt(num2);

    // Check if parsing was successful
    if (isNaN(parsedNum1) || isNaN(parsedNum2)) {
        setError('Invalid input');
        return;
    }

    try {
        // Use parsed values in the request
        const response = await fetch(`http://localhost:8080/api/${operation}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ num1: parsedNum1, num2: parsedNum2 })
        });
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
  
        const data = await response.json();
        setResult(data);
        setError('');
    } catch (error) {
        setError('Error: ' + error.message);
    }
};
  return (
    <div className="calculator">
      <h2>Simple Calculator</h2>
      <div className="input-group">
        <input type="number" value={num1} onChange={(e) => handleNumChange(e, 1)} placeholder="Enter number" />
        <input type="number" value={num2} onChange={(e) => handleNumChange(e, 2)} placeholder="Enter number" />
      </div>
      <div className="operation-group">
        <button onClick={handleOperation} value="+">+</button>
        <button onClick={handleOperation} value="-">-</button>
        <button onClick={handleOperation} value="*">*</button>
        <button onClick={handleOperation} value="/">/</button>
      </div>
      <button className="calculate-btn" onClick={calculateResult}>Calculate</button>
      {error && <div className="error">{error}</div>}
      <div className="result">{result}</div>
    </div>
  );
};

export default Calculator;
