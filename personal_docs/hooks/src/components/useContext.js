import React, { useState, createContext } from "react";
import Login from "./helpers/Login";
import User from "./helpers/User";

export const AppContext = createContext(null);

const ContextTutorial = () => {
  const [userName, setUserName] = useState("");
  return (
    <div>
      <AppContext.Provider value={{setUserName, userName}}>
        <Login /> <User />
      </AppContext.Provider>
    </div>
  );
};

export default ContextTutorial;
