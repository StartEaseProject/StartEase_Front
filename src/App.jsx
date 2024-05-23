import { Routes } from "react-router-dom";
import React, { useContext } from "react";
import "./App.css";
import { ThemeContext } from "./ThemeContext";

import { AuthProdiver } from "./AuthContext";
import { routes, renderRoutes } from "./routes";

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <AuthProdiver>
      <div className={`App ${darkMode ? "dark" : ""}`}>
        <Routes>{renderRoutes(routes)}</Routes>
      </div>
    </AuthProdiver>
  );
};

export default App;
