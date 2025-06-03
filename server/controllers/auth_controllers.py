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
    fname = data.get('first_name')
    lname = data.get('last_name')

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute('SELECT username from users_list WHERE username = %s', (username,))
        user = cursor.fetchone()

        if user:
            return jsonify({'error': 'Username already used'}), 409

        cursor.execute('INSERT INTO users_list (username, password, first_name, last_name) VALUES (%s, %s, %s, %s)', (username, hashPassword(password), fname, lname))
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
            # create_token = create_access_token(identity=str(user['id']))
            # refresh_token = create_refresh_token(identity=str(user['id']))

            # res = make_response(jsonify({
            #     'message': 'login success',
            #     'token': create_token,
            #     'id': user['id']
            # }), 200)

            # res.set_cookie(
            #     'access_token_cookie', create_token, httponly=True, secure=True, samesite='Strict'
            # )

            # res.set_cookie(
            #     'refresh_token_cookie', refresh_token, httponly=True, secure=True, samesite='Strict'
            # )
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

#search
@auth.route('/search', methods=['GET' ])
def search():
    query = request.args.get('query', '').strip()

    if not query:
        return jsonify({"users": []})
    
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute('SELECT id, first_name, last_name FROM users_list WHERE first_name ILIKE %s OR last_name ILIKE %s', (f"%{query}%", (f"%{query}%") ))
        users = cursor.fetchall()
        print(users)

        return jsonify({'users': users})
    
    except Exception as e:
        print("Search error:", e)  # Debugging
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()