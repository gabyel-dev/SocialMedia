from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import get_jwt_identity, create_access_token, create_refresh_token, jwt_required
from models.database import get_db_connection
from utility.password_hash import hashPassword, checkPassword

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute('INSERT INTO users_list (username, password) VALUES (%s, %s)', (username, hashPassword(password)))
        conn.commit()

        if cursor.rowcount > 0:
            return jsonify({'message': 'registered successfully'})
        
    except:
        return jsonify({'error': 'failed to insert data'})
    finally:
        cursor.close()
        conn.close()

