from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

def checkPassword(hashed, raw):
    return bcrypt.check_password_hash(hashed, raw)

def hashPassword(password):
    return bcrypt.generate_password_hash(password, 12).decode('utf-8')