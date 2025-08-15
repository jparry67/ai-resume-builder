from flask import Blueprint, request, jsonify
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import uuid

# Create a Blueprint for authentication routes
auth_bp = Blueprint('auth', __name__)

# Initialize Flask-Login
login_manager = LoginManager()

# In-memory user storage (in production, this would be a database)
users = {}

# User class for Flask-Login
class User:
    def __init__(self, user_id, email, first_name, last_name, password_hash):
        self.id = user_id
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.password_hash = password_hash
    
    def is_authenticated(self):
        return True
    
    def is_active(self):
        return True
    
    def is_anonymous(self):
        return False
    
    def get_id(self):
        return str(self.id)

# User loader for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    # Find user by ID in our users dict
    for user in users.values():
        if user.id == user_id:
            return user
    return None

# Initialize default test user
def init_default_user():
    """Initialize the default test user"""
    test_user = User(
        user_id="test-user-123",
        email="test@test.com",
        first_name="Test",
        last_name="User",
        password_hash=generate_password_hash("test-password")
    )
    users["test@test.com"] = test_user
    print("Default test user created: test@test.com / test-password")

# Initialize the default user
init_default_user()

@auth_bp.route('/api/login', methods=['POST'])
def login():
    """
    Login endpoint
    Expected JSON payload:
    {
        "email": "user@example.com",
        "password": "password123"
    }
    """
    try:
        # Get JSON data from request
        data = request.get_json()
        
        if not data:
            return jsonify({
                "error": "No JSON data provided",
                "timestamp": datetime.now().isoformat()
            }), 400
        
        # Extract login credentials
        email = data.get('email')
        password = data.get('password')
        
        # Basic validation
        if not email or not password:
            return jsonify({
                "error": "Email and password are required",
                "timestamp": datetime.now().isoformat()
            }), 400
        
        # Check if user exists
        if email not in users:
            return jsonify({
                "error": "Incorrect email or password",
                "timestamp": datetime.now().isoformat()
            }), 401
        
        user = users[email]
        
        # Check password
        if not check_password_hash(user.password_hash, password):
            return jsonify({
                "error": "Incorrect email or password",
                "timestamp": datetime.now().isoformat()
            }), 401
        
        # Log in the user
        login_user(user)
        print(f"Login successful for email: {email}")
        
        # Return success response
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "email": user.email,
                "firstName": user.first_name,
                "lastName": user.last_name
            },
            "timestamp": datetime.now().isoformat()
        }), 200
        
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({
            "error": "Internal server error",
            "timestamp": datetime.now().isoformat()
        }), 500

@auth_bp.route('/api/register', methods=['POST'])
def register():
    """
    Registration endpoint
    Expected JSON payload:
    {
        "firstName": "John",
        "lastName": "Doe", 
        "email": "user@example.com",
        "password": "password123",
        "confirmPassword": "password123"
    }
    """
    try:
        # Get JSON data from request
        data = request.get_json()
        
        if not data:
            return jsonify({
                "error": "No JSON data provided",
                "timestamp": datetime.now().isoformat()
            }), 400
        
        # Extract registration data
        first_name = data.get('firstName')
        last_name = data.get('lastName')
        email = data.get('email')
        password = data.get('password')
        
        # Basic validation
        if not all([first_name, last_name, email, password]):
            return jsonify({
                "error": "All fields are required",
                "timestamp": datetime.now().isoformat()
            }), 400
        
        # Check if user already exists
        if email in users:
            return jsonify({
                "error": "User with this email already exists",
                "timestamp": datetime.now().isoformat()
            }), 409
        
        # Create new user
        user_id = str(uuid.uuid4())
        password_hash = generate_password_hash(password)
        
        new_user = User(
            user_id=user_id,
            email=email,
            first_name=first_name,
            last_name=last_name,
            password_hash=password_hash
        )
        
        # Add user to our storage
        users[email] = new_user
        
        # Log in the user automatically after registration
        login_user(new_user)
        
        print(f"Registration successful for: {first_name} {last_name} ({email})")
        
        # Return success response
        return jsonify({
            "message": "Registration successful",
            "user": {
                "id": new_user.id,
                "email": new_user.email,
                "firstName": new_user.first_name,
                "lastName": new_user.last_name
            },
            "timestamp": datetime.now().isoformat()
        }), 200
        
    except Exception as e:
        print(f"Registration error: {str(e)}")
        return jsonify({
            "error": "Internal server error",
            "timestamp": datetime.now().isoformat()
        }), 500

@auth_bp.route('/api/logout', methods=['POST'])
@login_required
def logout():
    """Logout endpoint"""
    try:
        logout_user()
        return jsonify({
            "message": "Logout successful",
            "timestamp": datetime.now().isoformat()
        }), 200
    except Exception as e:
        print(f"Logout error: {str(e)}")
        return jsonify({
            "error": "Internal server error",
            "timestamp": datetime.now().isoformat()
        }), 500

@auth_bp.route('/api/user', methods=['GET'])
@login_required
def get_current_user():
    """Get current user information"""
    try:
        return jsonify({
            "user": {
                "id": current_user.id,
                "email": current_user.email,
                "firstName": current_user.first_name,
                "lastName": current_user.last_name
            },
            "timestamp": datetime.now().isoformat()
        }), 200
    except Exception as e:
        print(f"Get user error: {str(e)}")
        return jsonify({
            "error": "Internal server error",
            "timestamp": datetime.now().isoformat()
        }), 500

# Optional: Add a health check endpoint for testing
@auth_bp.route('/api/auth/health', methods=['GET'])
def auth_health():
    """Health check endpoint for authentication service"""
    return jsonify({
        "status": "healthy",
        "service": "authentication",
        "users_count": len(users),
        "timestamp": datetime.now().isoformat()
    }), 200
