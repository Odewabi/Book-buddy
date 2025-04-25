import React, { useState, useEffect } from "react";
import { useBooks } from "../context/BookContext";
import "./Goals.css";

const Goals = () => {
  const { books } = useBooks();
  const [goalType, setGoalType] = useState("pages");
  const [duration, setDuration] = useState("weekly");
  const [target, setTarget] = useState("");
  const [goalProgress, setGoalProgress] = useState(0);
  const [goalReached, setGoalReached] = useState(false);

  useEffect(() => {
    const savedGoal = JSON.parse(localStorage.getItem("readingGoal"));
    if (savedGoal) {
      setGoalType(savedGoal.goalType);
      setDuration(savedGoal.duration);
      setTarget(savedGoal.target);
    }
  }, []);

  useEffect(() => {
    const progress =
      goalType === "books"
        ? books.filter((b) => b.progress >= b.pages).length
        : books.reduce((acc, book) => acc + (book.progress || 0), 0);

    setGoalProgress(progress);

    if (target && progress >= Number(target)) {
      setGoalReached(true);
    } else {
      setGoalReached(false);
    }
  }, [books, goalType, target]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const goalData = { goalType, duration, target };
    localStorage.setItem("readingGoal", JSON.stringify(goalData));
    alert("Goal saved!");
  };

  return (
    <div className="goals-container">
      <h2 className="goals-heading">📈 Set Your Reading Goal</h2>
      <form onSubmit={handleSubmit} className="goal-form">
        <div className="form-group">
          <label>Goal Type:</label>
          <select value={goalType} onChange={(e) => setGoalType(e.target.value)}>
            <option value="pages">Pages</option>
            <option value="books">Books</option>
          </select>
        </div>
        <div className="form-group">
          <label>Duration:</label>
          <select value={duration} onChange={(e) => setDuration(e.target.value)}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="form-group">
          <label>Target {goalType}:</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">
          Save Goal
        </button>
      </form>

      <div className="progress-box">
        <p className="progress-label">📚 Current Progress:</p>
        <p>
          You’ve {goalType === "books" ? "finished" : "read"}{" "}
          <strong>{goalProgress}</strong> {goalType} so far this {duration}.
        </p>
      </div>

      {goalReached && (
        <div className="congrats-message">
          🎉 Congratulations! You've achieved your reading goal!
        </div>
      )}
    </div>
  );
};

export default Goals;