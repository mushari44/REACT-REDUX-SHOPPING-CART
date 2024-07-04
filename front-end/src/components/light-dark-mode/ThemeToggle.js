import React, { useState } from "react";
import { useTheme } from "./ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 600); // Match this duration with your animation duration
  };

  return (
    <div className="">
      <div className="flex items-center justify-center mt-2 sm:mt-0">
        <button
          onClick={handleClick}
          className={`p-2 rounded-full focus:outline-none focus:ring-2 transition-transform duration-300 ${
            isAnimating ? "animate-rotate" : ""
          }`}
        >
          {theme === "light" ? (
            <FaMoon className="text-gray-400  text-2xl md:text-4xl" />
          ) : (
            <FaSun className="text-yellow-300 md:text-4xl text-2xl " />
          )}
        </button>
      </div>
      <div>
        <span className="text-white md:text-base text-sm">
          change theme to {theme === "light" ? "DARK" : "LIGHT"}
        </span>
      </div>
    </div>
  );
};

export default ThemeToggle;
