import React, { useState } from "react";
import { useBooks } from "../context/BookContext";
import { useNavigate } from "react-router-dom";
import "./AddBook.css";

const AddBook = () => {
  const { addBook } = useBooks();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("Want to Read");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      id: Date.now(),
      title,
      author,
      pages: Number(pages),
      genre,
      progress: 0,
      status,
    };

    addBook(newBook);
    navigate("/");
  };

  return (
    <div className="add-book-container">
      <h2 className="add-book-title">📚 Add a New Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <input
          className="add-book-input"
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="add-book-input"
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          className="add-book-input"
          type="number"
          placeholder="Total Pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          required
        />
        <input
          className="add-book-input"
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <select
          className="add-book-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Want to Read</option>
          <option>Currently Reading</option>
          <option>Finished</option>
        </select>
        <button
          type="submit"
          className="add-book-button"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;