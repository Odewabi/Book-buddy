import React from "react";
import { useBooks } from "../context/BookContext";
import BookCard from "./BookCard";
import "./BookList.css";

const BookList = ({ searchQuery, filterStatus }) => {
  const { books } = useBooks();

  const filteredBooks = books.filter((book) => {
    const matchesSearchQuery =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || book.status === filterStatus;

    return matchesSearchQuery && matchesStatus;
  });

  const categories = ["Currently Reading", "Want to Read", "Finished"];

  return (
    <div className="book-list-container">
      {categories.map((category) => {
        const booksInCategory = filteredBooks.filter(
          (book) => book.status === category
        );

        if (booksInCategory.length === 0) return null;

        return (
          <div key={category} className="book-category">
            <h2 className="category-heading">
              {category === "Currently Reading" && "📖 "}
              {category === "Want to Read" && "🔖 "}
              {category === "Finished" && "✅ "}
              {category}
            </h2>
            <div className="book-grid">
              {booksInCategory.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookList;