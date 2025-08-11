from dataclasses import dataclass, field
import uuid

@dataclass
class Task:
    """Represents a single task in the system."""
    title: str
    description: str = ""
    completed: bool = False
    task_id: str = field(default_factory=lambda: str(uuid.uuid4()))

    def to_dict(self):
        """Converts the Task object to a dictionary."""
        return {
            "id": self.task_id,
            "title": self.title,
            "description": self.description,
            "completed": self.completed
        }
