import React, { useContext } from "react";
import { AppContext } from "../useContext";
const Login = () => {
  const { setUserName } = useContext(AppContext);
  return (
    <input
      onChange={(event) => {
        setUserName(event.target.value);
      }}
    />
  );
};

export default Login;
