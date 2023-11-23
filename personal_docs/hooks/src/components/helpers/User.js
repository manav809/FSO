import React, { useContext } from "react";
import { AppContext } from "../useContext";

const User = () => {
  const { userName } = useContext(AppContext);
  return <div>User: {userName}</div>;
};
export default User;
