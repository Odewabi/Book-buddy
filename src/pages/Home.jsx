import React, { useState } from "react";
import BookList from "../components/BookList";
import './Home.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  return (
    <main className="home-container" >
      <h1 className="home-title">📚 Your Library</h1>
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="All">All</option>
          <option value="Want to Read">Want to Read</option>
          <option value="Currently Reading">Currently Reading</option>
          <option value="Finished">Finished</option>
        </select>
      </div>
      <BookList searchQuery={searchQuery} filterStatus={filterStatus} />
    </main>
  );
};

export default Home;