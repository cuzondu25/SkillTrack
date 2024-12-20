from flask import Blueprint, request, jsonify
from services.db import get_db_connection
from flask_jwt_extended import jwt_required, get_jwt_identity

progress_bp = Blueprint('progress', __name__)

@progress_bp.route('/', methods=['GET'])
@jwt_required()
def get_progress():
    user_id = get_jwt_identity()
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("""
        SELECT courses_completed, total_courses, progress_percentage
        FROM progress
        WHERE user_id = %s
    """, (user_id))
    progress = cursor.fetchone()
    connection.close()

    if not progress:
        return jsonify({"message": "No progress found for this user"}), 404

    return jsonify(progress), 200

@progress_bp.route('/update', methods=['POST'])
@jwt_required()
def update_progress():
    data = request.get_json()
    user_id = get_jwt_identity()
    course_id = data.get('course_id')
    courses_completed = data.get('courses_completed')

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        UPDATE progress
        SET courses_completed = %s
        SET updated_course_id = %s
        WHERE user_id = %s
    """, (courses_completed, course_id, user_id))
    connection.commit()
    connection.close()

    return jsonify({"message": "Progress updated"}), 200


# Get all completed courses and quiz scores for a user
@progress_bp.route('/completed', methods=['GET'])
@jwt_required()
def get_completed_courses():
    user_id = get_jwt_identity()

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("""
        SELECT c.title AS course_title, p.quiz_score
        FROM course_progress p
        JOIN courses c ON p.course_id = c.id
        WHERE p.user_id = %s AND p.is_completed = TRUE
    """, (user_id,))
    completed_courses = cursor.fetchall()
    connection.close()

    return jsonify(completed_courses), 200
