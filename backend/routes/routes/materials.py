"""Create routes to manage study materials:

    * Get all materials for a course
    * Add a new study material
    * Delete a material
"""

from flask import Blueprint, request, jsonify
from services.db import get_db_connection
from flask_jwt_extended import jwt_required, get_jwt_identity

materials_bp = Blueprint('materials', __name__)

# Fetch all materials for a course
@materials_bp.route('/<int:course_id>', methods=['GET'])
@jwt_required()
def get_materials(course_id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    
    cursor.execute("""
        SELECT id, title, material_type, material_url
        FROM course_materials
        WHERE course_id = %s
    """, (course_id,))
    materials = cursor.fetchall()
    connection.close()

    return jsonify(materials), 200

# Add a new material to a course
@materials_bp.route('/', methods=['POST'])
@jwt_required()
def add_material():
    data = request.get_json()
    title = data.get('title')
    material_type = data.get('material_type')
    material_url = data.get('material_url')
    course_id = data.get('course_id')

    if not title or not material_type or not material_url or not course_id:
        return jsonify({"message": "All fields are required"}), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO course_materials (course_id, title, material_type, material_url)
        VALUES (%s, %s, %s, %s)
    """, (course_id, title, material_type, material_url))
    connection.commit()
    connection.close()

    return jsonify({"message": "Material added successfully"}), 201

# Delete a material by ID
@materials_bp.route('/<int:material_id>', methods=['DELETE'])
@jwt_required()
def delete_material(material_id):
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("DELETE FROM course_materials WHERE id = %s", (material_id,))
    connection.commit()
    connection.close()

    return jsonify({"message": "Material deleted successfully"}), 200
