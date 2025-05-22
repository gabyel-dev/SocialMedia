from flask import Flask
from flask_cors import CORS
from config.config import Config
from utility.password_hash import bcrypt
from models.database import get_db_connection
from controllers.auth_controllers import auth

app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(auth)
get_db_connection()

bcrypt.init_app(app)

CORS(app, supports_credentials=True)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)