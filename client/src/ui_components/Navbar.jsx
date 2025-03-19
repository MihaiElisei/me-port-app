/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */

import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = ({ navOpen }) => {
  const activeBox = useRef(null);
  const location = useLocation();

  const initActiveBox = () => {
    const currentActive = document.querySelector(".nav-link.active");
    if (currentActive && activeBox.current) {
      activeBox.current.style.top = `${currentActive.offsetTop}px`;
      activeBox.current.style.left = `${currentActive.offsetLeft}px`;
      activeBox.current.style.width = `${currentActive.offsetWidth}px`;
      activeBox.current.style.height = `${currentActive.offsetHeight}px`;
    }
  };

  useEffect(() => {
    setTimeout(initActiveBox, 50); // Small delay to prevent flickering
    window.addEventListener("resize", initActiveBox);
    return () => {
      window.removeEventListener("resize", initActiveBox);
    };
  }, [location.pathname]);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "Articles", path: "/articles" },
    { label: "Contact", path: "/contact", extraClass: "md:hidden" },
    { label: "Login", path: "/login", extraClass: "md:ml-auto" }, // Login button
  ];

  return (
    <nav className={`navbar ${navOpen ? "active" : ""}`}>
      {navItems.map(({ label, path }, key) => (
        <NavLink
          key={key}
          to={path}
          className={({ isActive }) => {
            if (path === "/portfolio" && location.pathname.startsWith("/project/")) {
              return "nav-link active";
            }
            if (path === "/blog" && location.pathname.startsWith("/blog/")) {
              return "nav-link active";
            }
            return isActive ? "nav-link active" : "nav-link";
          }}
        >
          {label}
        </NavLink>
      ))}
      <div className="active-box" ref={activeBox}></div>
    </nav>
  );
};

export default Navbar;
