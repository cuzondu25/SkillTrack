from flask import Flask
from flask_jwt_extended import JWTManager
from routes.auth import auth_bp
from services.db import get_db_connection
from flask_cors import CORS

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = '97962511-0742-4506-a8e1-0de9867c563c'
jwt = JWTManager(app)

CORS(app)
app.register_blueprint(auth_bp, url_prefix='/api/auth')
print(app.url_map)


if __name__ == '__main__':
    app.run(debug=True, threaded=True)
