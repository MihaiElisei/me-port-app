import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const AppLayout = () => {
  // Default to dark mode
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("dark") !== "false" // Default to true if null
  );

  useEffect(() => {
    if (localStorage.getItem("dark") === null) {
      localStorage.setItem("dark", "true"); // Default to dark mode
    }
  }, []);

  const handleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("dark", newDarkMode ? "true" : "false");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="w-full min-h-[100vh] bg-white dark:bg-zinc-900">
        <Header darkMode={darkMode} handleDarkMode={handleDarkMode} />
        <Outlet context={{ darkMode }} />
      </main>
    </div>
  );
};

export default AppLayout;
