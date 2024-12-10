from flask import Flask
from flask_jwt_extended import JWTManager
from routes.auth import auth_bp
from services.db import get_db_connection

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = '97962511-0742-4506-a8e1-0de9867c563c'
jwt = JWTManager(app)

app.register_blueprint(auth_bp, url_prefix='/api/auth')
print(app.url_map)

create_table = """
CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(255)
);
"""
    
conn = get_db_connection()
cur = conn.cursor()
cur.execute(create_table)
conn.commit()
cur.close()
conn.close()

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
