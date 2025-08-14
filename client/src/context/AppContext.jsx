import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URI;


  // NOTE: useState variable section

  const [user, setUser] = useState(false)


  const navigate = useNavigate();

  // NOTE: values section
  const values = {
    navigate,
    user,
  }

  return <AppContext.Provider value={values}>{children}</AppContext.Provider >
}

export const useAppContext = () => {
  return useContext(AppContext);
}
