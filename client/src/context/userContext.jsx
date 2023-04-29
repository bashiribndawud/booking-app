import { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();
const initialState = {
  user: null,
};

function reducerFn(state, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
      };
  }
}

// HOC
export const UserContextProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const [state, dispatch] = useReducer(reducerFn, initialState);
  useEffect(async () => {
    if (!state.user) {
      const {data} = await axios.get("auth/profile", { params: { token } });
      dispatch({ type: "SET_USER", user: data });
    }
  }, []);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
