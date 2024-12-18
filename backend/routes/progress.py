from flask import Blueprint, request, jsonify
from services.db import get_db_connection
from flask_jwt_extended import jwt_required, get_jwt_identity

progress_bp = Blueprint('progress', __name__)

@progress_bp.route('/<int:course_id>', methods=['GET'])
@jwt_required()
def get_progress(course_id):
    user_id = get_jwt_identity()
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("""
        SELECT lesson_completed, total_lessons, progress_percentage
        FROM progress
        WHERE user_id = %s AND course_id = %s
    """, (user_id, course_id))
    progress = cursor.fetchone()
    connection.close()

    if not progress:
        return jsonify({"message": "No progress found for this course"}), 404

    return jsonify(progress), 200

@progress_bp.route('/update', methods=['POST'])
@jwt_required()
def update_progress():
    data = request.get_json()
    user_id = get_jwt_identity()
    course_id = data.get('course_id')
    lessons_completed = data.get('lessons_completed')

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        UPDATE progress
        SET lesson_completed = %s
        WHERE user_id = %s AND course_id = %s
    """, (lessons_completed, user_id, course_id))
    connection.commit()
    connection.close()

    return jsonify({"message": "Progress updated"}), 200
