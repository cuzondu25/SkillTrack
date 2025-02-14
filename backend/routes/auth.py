from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from services.db import get_db_connection

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    role_name = data.get('role')  # Default to 'user' role

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    # Check if role exists
    cursor.execute("SELECT id FROM roles WHERE role_name = %s", (role_name,))
    role = cursor.fetchone()
    if not role:
        return jsonify({"message": f"Role '{role_name}' does not exist"}), 200

    # Check if user exists
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    if cursor.fetchone():
        return jsonify({"message": "User already exists"}), 200

    # Insert new user
    cursor.execute(
        "INSERT INTO users (username, password, role_id) VALUES (%s, %s, %s)",
        (username, password, role['id'])
    )
    connection.commit()
    connection.close()

    return jsonify({"message": "User registration successful! Please log in"}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    # Fetch user
    cursor.execute(
        "SELECT users.id, users.password, roles.role_name FROM users "
        "JOIN roles ON users.role_id = roles.id WHERE username = %s",
        (username,)
    )
    user = cursor.fetchone()
    connection.close()

    if not user or user['password'] != password:
        return jsonify({"message": "Invalid username or password"}), 401

    # Generate token with role
    token = create_access_token(identity={"id": user['id'], "role": user['role_name']})
    return jsonify({"token": token, "role": user['role_name']}), 200

