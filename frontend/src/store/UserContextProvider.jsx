import React, { useReducer } from "react";
import UserContext from "./userContext";

const defaultUserState = {
  name: "",
  phone_number: "",
  city: "",
  street: "",
  home: "",
  userFilled: false
};

function userReducer(state, action) {
  if (action.type === "SET_INFO") {
    return {
      name: action.info.name,
      phone_number: action.info.phone_number,
      city: action.info.city,
      street: action.info.street,
      home: action.info.home,
      userFilled: true
    };
  }
  return defaultUserState;
}

function UserContextProvider({ children }) {
  const [userState, dispatchUserAction] = useReducer(
    userReducer,
    defaultUserState
  );

  const setInfoUserHandler = (info) => {
    dispatchUserAction({ type: "SET_INFO", info });
  };
  const userContext = {
    name: userState.name,
    phone_number: userState.phone_number,
    city: userState.city,
    street: userState.street,
    home: userState.home,
    userFilled: userState.userFilled,
    setInfo: setInfoUserHandler,
  };
  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
}

export default UserContextProvider;
