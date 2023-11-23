import React, { useState } from "react";
import Login from "./helpers/Login";
import User from './helpers/User'
const ContextTutorial = () => {
  const [userName, setUserName] = useState("");
  return (
    <div>
      <Login setUsername={setUserName} /> <User userName={userName} />
    </div>
  );
};

export default ContextTutorial;
