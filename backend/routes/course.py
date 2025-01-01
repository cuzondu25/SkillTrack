from flask import Blueprint, request, jsonify
from services.db import get_db_connection
from flask_jwt_extended import jwt_required, get_jwt_identity

course_bp = Blueprint('course', __name__)

@course_bp.route('/courses', methods=['GET'])
def get_courses():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM courses")
    courses = cursor.fetchall()
    connection.close()
    return jsonify(courses), 200

@course_bp.route('/courses/enroll', methods=['POST'])
@jwt_required()
def enroll_course():
    data = request.get_json()
    course_id = data.get('course_id')
    user_id = get_jwt_identity()

    connection = get_db_connection()
    cursor = connection.cursor()

    # Check if the user is already enrolled
    cursor.execute("SELECT * FROM enrollments WHERE user_id = %s AND course_id = %s", (user_id, course_id))
    if cursor.fetchone():
        return jsonify({"message": "You are already enrolled in this course"}), 200

    # Enroll the user
    cursor.execute("INSERT INTO enrollments (user_id, course_id) VALUES (%s, %s)", (user_id, course_id))
    connection.commit()
    connection.close()
    return jsonify({"message": "Enrollment successful"}), 201

@course_bp.route('/courses/enrolled', methods=['GET'])
@jwt_required()
def get_enrolled_courses():
    user_id = get_jwt_identity()

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("""
        SELECT c.id, c.title, c.description, c.instructor
        FROM courses c
        JOIN enrollments e ON c.id = e.course_id
        WHERE e.user_id = %s
    """, (user_id,))
    enrolled_courses = cursor.fetchall()
    connection.close()
    return jsonify(enrolled_courses), 200
