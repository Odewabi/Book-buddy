import React, { useState } from "react";
import { useBooks } from "../context/BookContext";
import "./BookCard.css";

const BookCard = ({ book }) => {
  const { removeBook, updateProgress, editBook } = useBooks();
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState(book);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editedBook.title.trim() === "") {
      alert("Title is required!");
      return;
    }
    editBook(editedBook);
    setIsEditing(false);
  };

  const handleProgressChange = (e) => {
    const newProgress = Number(e.target.value);
    updateProgress(book.id, newProgress);
  };

  return (
    <div className="book-card">
      {isEditing ? (
        <>
          <div className="book-details">
            <input
              type="text"
              name="title"
              value={editedBook.title}
              onChange={handleChange}
              placeholder="Title"
            />
            <input
              type="text"
              name="author"
              value={editedBook.author}
              onChange={handleChange}
              placeholder="Author"
            />
            <input
              type="number"
              name="pages"
              value={editedBook.pages}
              onChange={handleChange}
              placeholder="Total Pages"
            />
            <select
              name="status"
              value={editedBook.status}
              onChange={handleChange}
            >
              <option value="Want to Read">Want to Read</option>
              <option value="Currently Reading">Currently Reading</option>
              <option value="Finished">Finished</option>
            </select>
            <input
              type="text"
              name="genre"
              value={editedBook.genre}
              onChange={handleChange}
              placeholder="Genre"
            />
          </div>
          <button onClick={handleSave} className="save-button">💾 Save</button>
        </>
      ) : (
        <>
          <h3>{book.title}</h3>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Pages:</strong> {book.pages}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <div className="progress-container">
            <p>Progress:</p>
            <input
              type="range"
              min="0"
              max={book.pages}
              value={book.progress}
              onChange={handleProgressChange}
            />
            <p>{book.progress}/{book.pages} pages</p>
          </div>
          <p><strong>Status:</strong> {book.status}</p>
          <div className="button-container">
            <button onClick={() => setIsEditing(true)} className="edit-button">✏️ Edit</button>
            <button onClick={() => removeBook(book.id)} className="remove-button">🗑️ Remove</button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookCard;