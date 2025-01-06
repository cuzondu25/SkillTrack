from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from datetime import timedelta
from routes.auth import auth_bp
from routes.quiz import quiz_bp
from routes.course import course_bp
from routes.progress import progress_bp
from routes.materials import materials_bp
from services.db import get_db_connection
from routes.admin_routes.admin_courses import admin_courses_bp
from routes.admin_routes.admin_quiz import admin_quiz_bp


app = Flask(__name__)

# initialization and configuration of flask JWT EXTENDED
app.config['JWT_SECRET_KEY'] = '97962511-0742-4506-a8e1-0de9867c563c'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=10)
jwt = JWTManager(app)

CORS(app)
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(quiz_bp, url_prefix='/api/quiz')
app.register_blueprint(course_bp, url_prefix='/api/course')
app.register_blueprint(progress_bp, url_prefix='/api/progress')
app.register_blueprint(materials_bp, url_prefix='/api/materials')
app.register_blueprint(admin_courses_bp, url_prefix='/api/admin')
app.register_blueprint(admin_quiz_bp, url_prefix='/api/admin')

print(app.url_map)


if __name__ == '__main__':
    app.run(debug=True, threaded=True)
