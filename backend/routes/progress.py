from flask import Blueprint, request, jsonify
from services.db import get_db_connection
from flask_jwt_extended import jwt_required, get_jwt_identity

progress_bp = Blueprint('progress', __name__)

@progress_bp.route('/', methods=['GET'])
@jwt_required()
def get_progress():
    user_id = get_jwt_identity()['id']
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    # Fetch total courses and completed courses
    cursor.execute("""
        SELECT COUNT(*) AS total_courses FROM enrollments
        WHERE user_id = %s
    """, (user_id,))
    total_courses = cursor.fetchone()['total_courses']

    cursor.execute("""
        SELECT COUNT(*) AS courses_completed FROM course_progress
        WHERE user_id = %s AND is_completed = TRUE
    """, (user_id,))
    courses_completed = cursor.fetchone()['courses_completed']

    connection.close()

    if total_courses > 0:
        progress_percentage = (courses_completed / total_courses) * 100
    else:
        progress_percentage = 0

    return jsonify({
        "total_courses": total_courses,
        "courses_completed": courses_completed,
        "progress_percentage": progress_percentage
    }), 200


@progress_bp.route('/update', methods=['POST'])
@jwt_required()
def update_progress():
    data = request.get_json()
    user_id = get_jwt_identity()['id']
    course_id = data.get('course_id')
    is_completed = data.get('is_completed')

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("""
        SELECT COUNT(question) AS total_questions
        FROM quizzes
        WHERE course_id = %s
    """, (course_id,))

    total_questions = cursor.fetchone()['total_questions']

    cursor.execute("""
        SELECT COUNT(is_correct) AS total_correct_answers
        FROM quiz_answers
        WHERE user_id = %s and course_id = %s and is_correct = TRUE
    """, (user_id, course_id))

    total_correct_answers = cursor.fetchone()['total_correct_answers']
    score = (total_correct_answers / total_questions) * 100

    # Check if the progress already exists
    cursor.execute("""
        SELECT COUNT(*) AS count FROM course_progress 
        WHERE user_id = %s AND course_id = %s
    """, (user_id, course_id))

    # Fetch the result
    result = cursor.fetchone()

    # Insert only if the record does not exist
    if result['count'] == 0:
        cursor.execute("""
            INSERT INTO course_progress
            (user_id, course_id, is_completed, quiz_score)
            VALUES (%s, %s, %s, %s)
        """, (user_id, course_id, is_completed, score))

    connection.commit()
    connection.close()

    return jsonify({"message": "Progress updated"}), 200


# Get all completed courses and quiz scores for a user
@progress_bp.route('/completed', methods=['GET'])
@jwt_required()
def get_completed_courses():
    user_id = get_jwt_identity()['id']

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
