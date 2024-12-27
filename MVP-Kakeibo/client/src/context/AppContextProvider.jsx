/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import icons from "../components/IconsList/IconsList";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [tokenApp, setTokenApp] = useState();
  const [isLogged, setIsLogged] = useState(false);
  const [categories, setCategories] = useState();
  const [movements, setMovements] = useState();
  const [goals, setGoals] = useState();
  const [reset, setReset] = useState(false);


  useEffect(() => {
    let tokenLocalStorage = localStorage.getItem("token");

    if (tokenLocalStorage) {
      const { id } = jwtDecode(tokenLocalStorage);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokenLocalStorage}`;
      axios
        .get(`http://localhost:3000/users/oneUser/${id}`)
        .then((res) => {
          setUser(res.data.user);
          setIsLogged(true);
          setTokenApp(tokenLocalStorage);
          setCategories(res.data.categories);
          setMovements(res.data.movements);
          setGoals(res.data.goals);
        })
        .catch();
    }
  }, [tokenApp, reset]);

  const logout = () => {
    setUser()
    setTokenApp()
    setIsLogged(false)
    localStorage.removeItem("token")
  }

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        tokenApp,
        setTokenApp,
        icons,
        categories,
        setCategories,
        movements,
        setMovements,
        goals,
        setGoals,
        logout,
        reset,
        setReset,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
