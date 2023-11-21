import React, { useEffect, useState } from "react";
import axios from "axios";

const EffectTutorial = () => {
  const [data, setData] = useState("");
  const [count, setCount] = useState(0);
  const [id, setId] = useState(1);
  useEffect(() => {
    axios
      .get(`https://anapioficeandfire.com/api/characters/${id}`)
      .then((response) => {
        setId(id => id + 1);
        console.log(response);
        setData(response.data.name);
      });
  // eslint-disable-next-line
  }, [count]);
  const increment = () => {
    setCount(count + 1);
  };
  return (
    <div style={{ flexDirection: "column" }}>
      <h1>API Response: {data}</h1>
      {count}
      <button onClick={increment}>click</button>
    </div>
  );
};

export default EffectTutorial;
