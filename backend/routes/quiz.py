from flask import Blueprint, request, jsonify
from services.db import get_db_connection
from flask_jwt_extended import jwt_required, get_jwt_identity

quiz_bp = Blueprint('quiz', __name__)

@quiz_bp.route('/quiz/<int:course_id>', methods=['GET'])
@jwt_required()
def get_quiz(course_id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("""
        SELECT id, question
        FROM quizzes
        WHERE course_id = %s
    """, (course_id,))
    quizzes = cursor.fetchall()
    connection.close()

    return jsonify(quizzes), 200

@quiz_bp.route('/quiz/submit', methods=['POST'])
@jwt_required()
def submit_quiz():
    data = request.get_json()
    user_id = get_jwt_identity()
    quiz_id = data.get('quiz_id')
    selected_answer = data.get('selected_answer')

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT correct_answer FROM quizzes WHERE id = %s", (quiz_id,))
    correct_answer = cursor.fetchone().get('correct_answer')
    is_correct = (selected_answer == correct_answer)

    cursor.execute("""
        INSERT INTO quiz_answers (quiz_id, user_id, selected_answer, is_correct)
        VALUES (%s, %s, %s, %s)
    """, (quiz_id, user_id, selected_answer, is_correct))
    connection.commit()
    connection.close()

    return jsonify({"message": "Quiz submitted", "is_correct": is_correct}), 201
