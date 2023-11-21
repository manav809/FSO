import React, { useRef } from "react";

//Ref is used to manipulate DOM elements

const RefTutorial = () => {
  const inputRef = useRef(null);
  const onClick = () => {
    inputRef.current.focus();
    //inputRef.current.value = ""
  };
  return (
    <div>
      <h1>Manav</h1>
      <input  type="text" placeholder="Ex" ref={inputRef} />
      <button onClick={onClick}>Change Name</button>
    </div>
  );
};

export default RefTutorial;
