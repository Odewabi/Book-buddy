import React from "react";
import { useBooks } from "../context/BookContext";
import "./Settings.css";

const Settings = () => {
  const { darkMode, setDarkMode } = useBooks();

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>
      <div className="settings-content">
        <div className="dark-mode-toggle">
          <input
            id="darkMode"
            type="checkbox"
            checked={darkMode}
            onChange={handleDarkModeToggle}
            className="dark-mode-checkbox"
          />
          <label htmlFor="darkMode" className="dark-mode-label">
            Dark Mode
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;