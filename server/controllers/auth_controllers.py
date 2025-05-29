from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import get_jwt_identity, create_access_token, create_refresh_token, jwt_required
from models.database import get_db_connection
from utility.password_hash import hashPassword, checkPassword

auth = Blueprint('auth', __name__)

#register route
@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute('SELECT username from users_list WHERE username = %s', (username,))
        user = cursor.fetchone()

        if user:
            return jsonify({'error': 'Username already used'}), 409

        cursor.execute('INSERT INTO users_list (username, password) VALUES (%s, %s)', (username, hashPassword(password)))
        conn.commit()

        if cursor.rowcount > 0:
            return jsonify({'message': 'registered successfully'}), 200
        
    except:
        return jsonify({'error': 'failed to insert data'}), 500
    finally:
        cursor.close()
        conn.close()

#login route
@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('SELECT * FROM users_list WHERE username = %s', (username,))
        user = cursor.fetchone()

        if user and checkPassword(user['password'], password):
            return jsonify({'message': 'logged In successful'}), 200
        
        return jsonify({'error': 'Invalid username or password'}), 401

    except:
        return jsonify({'error': 'login Failed'})
    finally:
        cursor.close()
        conn.close()

#reset password route
@auth.route('/reset_password', methods=['POST'])
def reset_password():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    new_password = data.get('new_password')

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('SELECT username, password FROM users_list WHERE username = %s', (username,))
        user = cursor.fetchone()

        if user and checkPassword(user['password'], password):
            hashed_new_password = hashPassword(new_password)
            cursor.execute('UPDATE users_list SET password = %s WHERE username = %s', (hashed_new_password, username))
            conn.commit()

            if cursor.rowcount > 0:
                return jsonify({'message': 'Changed Password Successfully'}), 200
            
        return jsonify({'error': 'Invalid Credentials'}), 401
    
    except:
        return jsonify({'error': 'Failed to change password'}), 500
    finally:
        cursor.close()
        conn.close()

