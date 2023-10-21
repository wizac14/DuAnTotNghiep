import { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext();
export const AppContextProvider = (props) => {
  const { children } = props;
  const [isLogin, setisLogin] = useState(false);
  const [inforuser, setinforuser] = useState({});
  return (
    <AppContext.Provider
      value={{ isLogin, setisLogin, inforuser, setinforuser }}
    >
      {children}
    </AppContext.Provider>
  );
};
