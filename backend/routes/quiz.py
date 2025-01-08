from flask import Blueprint, request, jsonify
from services.db import get_db_connection
from flask_jwt_extended import jwt_required, get_jwt_identity

quiz_bp = Blueprint('quiz', __name__)

@quiz_bp.route('/<int:course_id>', methods=['GET'])
@jwt_required()
def get_quiz(course_id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("""
        SELECT id, question, option_A, option_B, option_C, option_D
        FROM quizzes
        WHERE course_id = %s
    """, (course_id,))
    quizzes = cursor.fetchall()
    connection.close()

    return jsonify(quizzes), 200

@quiz_bp.route('/submit', methods=['POST'])
@jwt_required()
def submit_quiz():
    data = request.get_json()
    user_id = get_jwt_identity()['id']
    course_id = data.get('course_id')
    selected_answers = data.get('selected_answers')

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    for quiz_id, selected_answer in selected_answers.items():
        cursor.execute("SELECT correct_answer FROM quizzes WHERE id = %s", (quiz_id,))
        correct_answer = cursor.fetchone().get('correct_answer')
        is_correct = (selected_answer == correct_answer)

        # Check if the record already exists
        cursor.execute("""
            SELECT COUNT(*) AS count FROM quiz_answers 
            WHERE user_id = %s AND course_id = %s AND quiz_id = %s
        """, (user_id, course_id, quiz_id))

        # Fetch the result
        result = cursor.fetchone()

        # Insert only if the record does not exist
        if result['count'] == 0:
            cursor.execute("""
                INSERT INTO quiz_answers
                (quiz_id, user_id, course_id, selected_answer, is_correct)
                VALUES (%s, %s, %s, %s, %s)
            """, (quiz_id, user_id, course_id, selected_answer, is_correct))

    
    connection.commit()
    connection.close()

    return jsonify({"message": "Quiz submitted successfully"}), 201
