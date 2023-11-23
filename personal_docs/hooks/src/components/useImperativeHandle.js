import React, {useRef} from "react";
import Button from "./helpers/Button";
//use case is for snackbar,
const ImperativeHandleTutorial = () => {
  const toggleRef = useRef(null);
  return (
    <div>
      <button onClick={() => {toggleRef.current.alterToggle()}}>Button from Parent</button>
      <Button ref={toggleRef}/>
    </div>
  );
};

export default ImperativeHandleTutorial;
