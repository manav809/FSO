import React, { useState, useEffect } from "react";
import axios from "axios";

//useMemo is used so that high computed tasks dont have to be redone upon rerendering
//we all want it to be computed when its param or its dependency changes
//in this case the high computed task is "findLongestName" function
const MemoTutorial = () => {
  const [data, setData] = useState(null);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        setData(response.data);
      });
  }, []);
  const findLongestName = (comments) => {
    if (!comments) return null;
    let longestName = "";
    for (let i = 0; i < comments.length; i++) {
      let currentName = comments[i].name;
      if (currentName.length > longestName.length) {
        longestName = currentName;
      }
    }
    console.log("Computed!!!");
    return longestName;
  };
  return (
    <div>
      <div>{findLongestName(data)}</div>
      <button onClick={() => setToggle(!toggle)}>toggle</button>
      {toggle && <h1>Toggle</h1>}
    </div>
  );
};

export default MemoTutorial;
