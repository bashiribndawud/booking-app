import { createContext, useReducer, useContext, useEffect, useState } from "react";
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
  const [ready, setReady] = useState(false)
  const token = localStorage.getItem("token");
  const [state, dispatch] = useReducer(reducerFn, initialState);
  useEffect(() => {
    async function getUserProfile(){
      if (!state.user) {
        const {data} = await axios.get("/profile", { params: { token } });
        dispatch({ type: "SET_USER", user: data });
        setReady(true)
      }
    }

    getUserProfile()
  }, []);
  return (
    <UserContext.Provider value={{ state, dispatch, ready }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
