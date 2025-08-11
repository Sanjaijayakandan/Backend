import React from 'react';
import TaskManagementPage from './pages/TaskManagementPage';
import './App.css'; // Global application styles

/**
 * @fileoverview Main application component. Renders the TaskManagementPage.
 */

/**
 * The root component of the frontend application.
 * It sets up the basic layout and renders the main TaskManagementPage.
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* You could add a global navigation or logo here if needed */}
      </header>
      <main className="App-main">
        <TaskManagementPage />
      </main>
      <footer className="App-footer">
        <p>&copy; 2023 Task Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
