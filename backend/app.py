from flask import Flask, jsonify, send_from_directory, request
import os
import numpy as np

app = Flask(__name__, static_folder='static')

@app.route('/api/hello', methods=['GET'])
def hello_world():
    """Simple API endpoint that returns 'hello world' with numpy test"""
    # Test numpy functionality
    random_number = np.random.randint(1, 101)
    return jsonify({
        "message": "hello world",
        "numpy_test": f"Random number from numpy: {random_number}"
    })

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_angular(path):
    """Serve the Angular app for all routes except /api/*"""
    if path.startswith('api/'):
        return {"error": "API endpoint not found"}, 404
    
    # Check if the path is a static file (has an extension)
    if '.' in path and not path.endswith('/'):
        static_folder = app.static_folder or 'static'
        return send_from_directory(static_folder, path)
    
    # Serve index.html for all other routes (Angular routing)
    static_folder = app.static_folder or 'static'
    return send_from_directory(static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 