import React, { createContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider(props) {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
