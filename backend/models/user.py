from werkzeug.security import generate_password_hash, check_password_hash

class User:
    def __init__(self, user_id, username, password):
        self.id = user_id
        self.username = username
        self.password = generate_password_hash(password)
    
    def verify_password(self, password):
        return check_password_hash(self.password, password)

