import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default ""
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "";
  });

  // Whenever theme changes, update html attribute and localStorage
  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem("theme");
    }
  }, [theme]);

  // Toggle function for the 2025 Trends theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
