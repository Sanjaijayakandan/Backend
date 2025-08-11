import React, { useState } from 'react';
import './TaskInput.css'; // Assuming some basic styling

/**
 * @fileoverview TaskInput component for entering new task details.
 * This component handles the 'User enters task title' scenario.
 */

/**
 * TaskInput component allows users to enter a task title and description,
 * and submit them to create a new task.
 * @param {Object} props - Component props.
 * @param {function(string, string): void} props.onCreateTask - Callback function
 *   to be called when a new task is submitted, receiving title and description.
 */
function TaskInput({ onCreateTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!title.trim()) {
      setError('Task title cannot be empty.');
      return;
    }

    onCreateTask(title, description);
    setTitle(''); // Clear the input field after submission
    setDescription('');
  };

  return (
    <div className="task-input-container">
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit} className="task-input-form">
        <div className="form-group">
          <label htmlFor="task-title">Task Title:</label>
          <input
            type="text"
            id="task-title"
            className="task-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title (e.g., Buy groceries)"
            required
            aria-label="Task Title input field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-description">Task Description:</label>
          <textarea
            id="task-description"
            className="task-description-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional: Add a detailed description"
            rows="3"
            aria-label="Task Description textarea"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="submit-button">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskInput;
