import React, { useEffect, useLayoutEffect, useRef } from "react";
//useLayoutEffect is called while loading
//useEffect is called after everything is loaded
const LayoutEffectTutorial = () => {
  const inputRef = useRef(null);
  useLayoutEffect(() => {
    console.log(inputRef.current.value);
  }, []);

  useEffect(() => {
    console.log("Hey");
    inputRef.current.value = "after";
  }, []);

  return (
    <div>
      <input ref={inputRef} value="before" style={{height: "100px"}}/>
    </div>
  );
};

export default LayoutEffectTutorial;
