import React from "react";
import { Link } from "react-router-dom";
import { useBooks } from "../context/BookContext";
import './Header.css';

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useBooks();

  return (
    <header>
      <div className="logo">
        📚 BookBuddy
      </div>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/add">Add Book</Link>
        <Link to="/goals">Goals</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </header>
  );
};

export default Header;