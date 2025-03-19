/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */

import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import Navbar from "./Navbar";

const Header = ({darkMode,handleDarkMode}) => {
    const [navOpen, setNavOpen] = useState(false);

    return (
      <header className="fixed top-0 left-0 w-full h-20 flex items-center z-40 bg-white dark:bg-zinc-900 shadow-lg shadow-zinc-300 dark:shadow-none">
        <div className="max-w-screen-2xl w-full mx-auto px-4 flex justify-between items-center md:px-6 md:grid md:[grid-template-columns:1fr_3fr_1fr]">
          <h1>
            <a href="/" className="logo">
              <img className="rounded-sm" src={darkMode ? "/images/logo.png" : "/images/logo_bg.png"} alt="Logo" width={80} height={80} />
            </a>
          </h1>
          <div className="relative md:justify-self-center">
            <button
              className="menu-btn md:!hidden"
              onClick={() => setNavOpen((prev) => !prev)}
            >
              <span className="material-symbols-rounded md:!hidden dark:text-white">
                {navOpen ? "close" : "menu"}
              </span>
            </button>
            <Navbar navOpen={ navOpen }/>
          </div>
          <Switch className="justify-self-end md:mr-6" onCheckedChange={handleDarkMode} checked={darkMode} />
        </div>
      </header>
    );
}

export default Header