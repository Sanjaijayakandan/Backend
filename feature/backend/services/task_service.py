from typing import List, Dict, Optional
from feature.backend.models.task import Task

class TaskService:
    """Manages the business logic for tasks, including storage and retrieval."""
    _tasks: List[Task] = []

    def create_task(self, title: str, description: str = "") -> Task:
        """Creates a new task and adds it to the in-memory storage."""
        if not title: # Basic validation
            raise ValueError("Task title cannot be empty")
        new_task = Task(title=title, description=description)
        self._tasks.append(new_task)
        return new_task

    def get_all_tasks(self) -> List[Task]:
        """Retrieves all tasks."""
        return self._tasks

    def get_task_by_id(self, task_id: str) -> Optional[Task]:
        """Retrieves a task by its ID."""
        return next((task for task in self._tasks if task.task_id == task_id), None)

    def update_task(self, task_id: str, updates: Dict) -> Optional[Task]:
        """Updates an existing task by its ID with provided details."""
        task = self.get_task_by_id(task_id)
        if task:
            if 'title' in updates: task.title = updates['title']
            if 'description' in updates: task.description = updates['description']
            if 'completed' in updates: task.completed = updates['completed']
        return task

    def delete_task(self, task_id: str) -> bool:
        """Deletes a task by its ID."""
        original_count = len(self._tasks)
        self._tasks = [task for task in self._tasks if task.task_id != task_id]
        return len(self._tasks) < original_count

# Instantiate a singleton service
task_service = TaskService()
