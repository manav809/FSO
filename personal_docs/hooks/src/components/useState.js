import React, { useState } from "react";

const StateTutorial = () => {
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState(0);

  const increment = () => {
    const count = counter + 1;
    setCounter(count);
  };
  const assign = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };
  return (
    <>
      {counter} <button onClick={increment}>Increment</button>
      <input placeholder="enter something" onChange={assign} />
      {inputValue}
    </>
  );
};

export default StateTutorial;
