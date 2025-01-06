from flask import Blueprint, request, jsonify
from services.db import get_db_connection
from flask_jwt_extended import jwt_required, get_jwt_identity

admin_quiz_bp = Blueprint('admin_quiz_bp', __name__)

@admin_quiz_bp.route('/<int:course_id>/add', methods=['POST'])
@jwt_required()
def add_quiz_question(course_id):
    current_user = get_jwt_identity()

    # Ensure only admins can add quiz questions
    if current_user['role'] != 'admin':
        return jsonify({"message": "Access denied: Admins only"}), 403

    data = request.get_json()
    question = data.get('question')
    option_A = data.get('option_A')
    option_B = data.get('option_B')
    option_C = data.get('option_C')
    option_D = data.get('option_D')
    correct_answer = data.get('correct_answer')

    if not question or not correct_answer:
        return jsonify({"message": "Question and correct answer are required"}), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    # Insert quiz question into the database
    cursor.execute("""
        INSERT INTO quizzes (course_id, question, option_A, option_B, option_C, option_D, correct_answer)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (course_id, question, option_A, option_B, option_C, option_D, correct_answer))

    connection.commit()
    connection.close()

    return jsonify({"message": "Quiz question added successfully"}), 201
