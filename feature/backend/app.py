from flask import Flask, jsonify
from flask_cors import CORS
from feature.backend.routes.task_routes import task_bp

app = Flask(__name__)
CORS(app) # Enable CORS for all routes, allowing frontend to access

# Register blueprints
app.register_blueprint(task_bp)

@app.route('/')
def health_check():
    """Basic health check endpoint."""
    return jsonify({"status": "Server is running", "service": "Task Management Backend"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
