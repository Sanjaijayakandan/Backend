/**
 * @fileoverview API service for interacting with the task management backend.
 */

const API_BASE_URL = 'http://localhost:5000/api/tasks';

/**
 * Creates a new task.
 * @param {string} title - The title of the task.
 * @param {string} [description=''] - The description of the task.
 * @returns {Promise<Object>} The created task object from the backend.
 * @throws {Error} If the API call fails or returns an error.
 */
export const createTask = async (title, description = '') => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

/**
 * Fetches all tasks from the backend.
 * @returns {Promise<Array<Object>>} An array of task objects.
 * @throws {Error} If the API call fails or returns an error.
 */
export const fetchTasks = async () => {
  try {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

/**
 * Updates an existing task.
 * @param {string} taskId - The ID of the task to update.
 * @param {Object} updates - An object containing the fields to update (e.g., { completed: true }).
 * @returns {Promise<Object>} The updated task object from the backend.
 * @throws {Error} If the API call fails or returns an error.
 */
export const updateTask = async (taskId, updates) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

/**
 * Deletes a task by its ID.
 * @param {string} taskId - The ID of the task to delete.
 * @returns {Promise<void>} A promise that resolves if the deletion is successful.
 * @throws {Error} If the API call fails or returns an error.
 */
export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${taskId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
