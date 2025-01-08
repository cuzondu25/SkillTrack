from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.db import get_db_connection

admin_courses_bp = Blueprint('admin_courses', __name__)

@admin_courses_bp.route('/courses', methods=['GET'])
@jwt_required()
def get_admin_courses():
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({"message": "Access denied: Admins only"}), 403

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM courses WHERE created_by = %s", (current_user['id'],))
    courses = cursor.fetchall()
    connection.close()

    return jsonify(courses), 200

@admin_courses_bp.route('/courses', methods=['POST'])
@jwt_required()
def add_course():
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({"message": "Access denied: Admins only"}), 403

    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    instructor = data.get('instructor')

    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("""
        INSERT INTO courses (created_by, title, description, instructor)
        VALUES (%s, %s, %s, %s)
        """, (current_user['id'], title, description, instructor)
    )
    connection.commit()
    connection.close()

    return jsonify({"message": "Course added successfully!"}), 201

@admin_courses_bp.route('/courses/<int:course_id>', methods=['DELETE'])
@jwt_required()
def delete_course(course_id):
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({"message": "Access denied: Admins only"}), 403

    connection = get_db_connection()
    cursor = connection.cursor()

    # Ensure the course belongs to the admin
    cursor.execute("""
        SELECT id FROM courses WHERE id = %s AND created_by = %s
        """, (course_id, current_user['id']))
    course = cursor.fetchone()
    if not course:
        return jsonify({"message": "access denied"}), 404

    # Delete course and any refrence to it on other tables
    cursor.execute("DELETE FROM course_materials WHERE course_id = %s", (course_id,))

    cursor.execute("DELETE FROM course_progress WHERE course_id = %s", (course_id,))

    cursor.execute("DELETE FROM quiz_answers WHERE course_id = %s", (course_id,))
    
    cursor.execute("DELETE FROM quizzes WHERE course_id = %s", (course_id,))

    cursor.execute("DELETE FROM enrollments WHERE course_id = %s", (course_id,))

    cursor.execute("DELETE FROM courses WHERE id = %s", (course_id,))
    connection.commit()
    connection.close()

    return jsonify({"message": "Course deleted successfully!"}), 200

