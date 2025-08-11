from flask import Blueprint, request, jsonify
from feature.backend.services.task_service import task_service

task_bp = Blueprint('tasks', __name__, url_prefix='/api/tasks')

@task_bp.route('/', methods=['POST'])
def create_task():
    """Endpoint to create a new task. Handles user entering task title/description."""
    data = request.get_json()
    title = data.get('title')
    description = data.get('description', '')

    if not title:
        return jsonify({"error": "Task title is required"}), 400

    try:
        new_task = task_service.create_task(title, description)
        return jsonify(new_task.to_dict()), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "An internal error occurred", "details": str(e)}), 500

@task_bp.route('/', methods=['GET'])
def get_tasks():
    """Endpoint to retrieve all tasks."""
    tasks = [task.to_dict() for task in task_service.get_all_tasks()]
    return jsonify(tasks), 200

@task_bp.route('/<string:task_id>', methods=['GET'])
def get_task(task_id):
    """Endpoint to retrieve a single task by ID."""
    task = task_service.get_task_by_id(task_id)
    if task:
        return jsonify(task.to_dict()), 200
    return jsonify({"error": "Task not found"}), 404

@task_bp.route('/<string:task_id>', methods=['PUT'])
def update_task(task_id):
    """Endpoint to update an existing task."""
    data = request.get_json()
    updated_task = task_service.update_task(task_id, data)
    if updated_task:
        return jsonify(updated_task.to_dict()), 200
    return jsonify({"error": "Task not found"}), 404

@task_bp.route('/<string:task_id>', methods=['DELETE'])
def delete_task(task_id):
    """Endpoint to delete a task."""
    if task_service.delete_task(task_id):
        return jsonify({"message": "Task deleted successfully"}), 200
    return jsonify({"error": "Task not found"}), 404
