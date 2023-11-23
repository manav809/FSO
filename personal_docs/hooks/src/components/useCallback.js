import React, { useCallback, useState } from "react";
import Text from "./helpers/Text";

//useCallback is used for child components to not have to rerender
//in this case toggle being changed on every click is leading to Text(child component)
//to also be rerendered
//this is different from useMemo because it has to do with functions
const CallbackTutorial = () => {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState("Hello World");

  const returnComment = useCallback(
    (name) => {
      return data + name;
    },
    [data]
  );
  return (
    <div>
      <Text returnComment={returnComment} />
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
      {toggle && <h1>Toggle</h1>}
    </div>
  );
};

export default CallbackTutorial;
