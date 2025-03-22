/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from 'react-toastify';

const AppLayout = () => {

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("dark") === "true";
  });

  useEffect(() => {
    localStorage.setItem("dark", darkMode ? "true" : "false");
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="w-full min-h-[100vh] bg-slate-100 dark:bg-zinc-900">
        <Header darkMode={darkMode} handleDarkMode={handleDarkMode} />
        <ToastContainer />
        <Outlet context={{ darkMode }} />
        <Footer darkMode={darkMode} />
      </main>
    </div>
  );
};

export default AppLayout;
