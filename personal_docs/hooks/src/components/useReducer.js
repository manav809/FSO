import React, { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1, showText: state.showText };
    case "TOGGLE":
      return { count: state.count, showText: !state.showText };
    default:
      return state;
  }
};
const ReducerTutorial = () => {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    showText: true,
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ flexDirection: "column" }}>
        <h1>{state.count}</h1>
        <button
          onClick={() => {
            dispatch({type: "INCREMENT"})
            dispatch({type: "TOGGLE"})
          }}
        >
          Click Here
        </button>
        {state.showText && <p>This is a text</p>}
      </div>
    </div>
  );
};

export default ReducerTutorial;
