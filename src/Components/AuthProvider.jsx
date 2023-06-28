import React from "react";

const AuthContext = React.createContext({
  isAuthenticated: false,
  employeeID: null,
  debugMode: false,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
