import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import Goals from './pages/Goals';
import Settings from './pages/Settings';
import Header from './components/Header';
import './App.css';


function App() {
  return (
    <BookProvider>
      <Router>
        <Header />
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;