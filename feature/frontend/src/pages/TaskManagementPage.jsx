import React, { useState, useEffect } from 'react';
import TaskInput from '../components/TaskInput';
import { createTask, fetchTasks, updateTask, deleteTask } from '../services/taskApi';
import './TaskManagementPage.css'; // Assuming some basic styling

/**
 * @fileoverview TaskManagementPage displays the task input form and the list of tasks.
 * It serves as the 'Task Management Section' mentioned in the Behave steps.
 */

/**
 * TaskManagementPage component. This is the main page for managing tasks.
 * It integrates the TaskInput component and displays the list of tasks.
 */
function TaskManagementPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'active'
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to load tasks: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = async (title, description) => {
    try {
      const newTask = await createTask(title, description);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      console.log('Task successfully entered:', newTask);
      // This console log serves as a proxy for the Behave step
      // '@then the task title should be successfully entered'
    } catch (err) {
      setError('Failed to create task: ' + err.message);
    }
  };

  const handleToggleComplete = async (taskId, currentCompletedStatus) => {
    try {
      const updatedTask = await updateTask(taskId, { completed: !currentCompletedStatus });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (err) {
      setError('Failed to update task status: ' + err.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } catch (err) {
        setError('Failed to delete task: ' + err.message);
      }
    }
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const handleSaveEdit = async (taskId) => {
    try {
      const updatedTask = await updateTask(taskId, {
        title: editedTitle,
        description: editedDescription,
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
      setEditingTaskId(null);
      setEditedTitle('');
      setEditedDescription('');
    } catch (err) {
      setError('Failed to save task edits: ' + err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedTitle('');
    setEditedDescription('');
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  if (loading) return <div className="loading-message">Loading tasks...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="task-management-section">
      <h1>Task Management Dashboard</h1>

      <TaskInput onCreateTask={handleCreateTask} />

      <div className="task-list-section">
        <h2>Your Tasks</h2>

        <div className="filter-options">
          <span>Filter Tasks: </span>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter tasks dropdown">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {filteredTasks.length === 0 ? (
          <p className="no-tasks-message">No tasks found for this filter.</p>
        ) : (
          <ul className="task-list">
            {filteredTasks.map((task) => (
              <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                {editingTaskId === task.id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      aria-label="Edit task title"
                    />
                    <textarea
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      rows="2"
                      aria-label="Edit task description"
                    />
                    <button onClick={() => handleSaveEdit(task.id)} className="save-button">Save</button>
                    <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
                  </div>
                ) : (
                  <div className="task-display">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task.id, task.completed)}
                      aria-label={`Mark task "${task.title}" as completed`}
                      className="complete-checkbox"
                    />
                    <div className="task-details">
                      <span className="task-title">{task.title}</span>
                      {task.description && <p className="task-description">{task.description}</p>}
                    </div>
                    <div className="task-actions">
                      <button onClick={() => handleEditClick(task)} className="edit-button">Edit</button>
                      <button onClick={() => handleDeleteTask(task.id)} className="delete-button">Delete</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TaskManagementPage;
