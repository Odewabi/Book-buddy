import React, { createContext, useContext, useState, useEffect } from 'react';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState(() => {
    const stored = localStorage.getItem('books');
    return stored ? JSON.parse(stored) : [];
  });

  const [goal, setGoal] = useState(() => {
    const stored = localStorage.getItem('goal');
    return stored ? JSON.parse(stored) : { type: 'pages', target: 0, duration: 'weekly' };
  });

  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('goal', JSON.stringify(goal));
  }, [goal]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addBook = (book) => setBooks(prev => [...prev, book]);

  const updateProgress = (id, newProgress) => {
    setBooks(prevBooks =>
      prevBooks.map(book => {
        if (book.id !== id) return book;
  
        const isFinished = newProgress >= book.pages;
        return {
          ...book,
          progress: isFinished ? book.pages : newProgress,
          status: isFinished ? "Finished" : "Currently Reading",
        };
      })
    );
  };

  const editBook = (updatedBook) => {
    setBooks(prev =>
      prev.map(book => (book.id === updatedBook.id ? { ...book, ...updatedBook } : book))
    );
  };  

  const removeBook = (id) => setBooks(books.filter(book => book.id !== id));

  const totalPagesRead = books.reduce((sum, b) => sum + b.progress, 0);
  const booksFinished = books.filter(b => b.progress >= b.pages).length;
  const goalProgress = goal.type === 'pages' ? totalPagesRead : booksFinished;
  const goalPercentage = goal.target > 0 ? Math.min(100, Math.round((goalProgress / goal.target) * 100)) : 0;

  return (
    <BookContext.Provider
      value={{
        books,
        addBook,
        updateProgress,
        removeBook,
        editBook,
        goal,
        setGoal,
        goalProgress,
        goalPercentage,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => useContext(BookContext);