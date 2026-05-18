from carwash_locations import WASH_WORLD_LOCATIONS

from flask import Flask, render_template, request, jsonify, session
import uuid
import time
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

import x
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required

from flask_cors import CORS


from icecream import ic
ic.configureOutput(prefix=f"_____ | ", includeContext=True)

app = Flask(__name__)
CORS(app)  # allows everything
app.config["JWT_SECRET_KEY"] = "super-secret-key"
jwt = JWTManager(app)

app.secret_key = "your_secret_key"

############### GET ###############
@app.get("/")
def show_index():
    return "This is the index page"


# GET LOCATIONS (PLURAL)
@app.get('/locations')
def get_locations():
    locations = WASH_WORLD_LOCATIONS
    return jsonify(locations)


# GET LOCATION (SINGULAR)
@app.get('/locations/<id>')
def get_location(id):
    for location in WASH_WORLD_LOCATIONS:
        if location['id'] == id:
            return jsonify(location)
    return jsonify({'Error': 'Location not found'}), 400



##############################



############### POST ###############

##############################
@app.post('/register-user')
def register_user():
    try:
        data = request.get_json()

        user_id = uuid.uuid4().hex

        ic("INCOMING DATA: ", data)

        user_first_name = x.validate_user_first_name(data.get('name'))
        user_last_name = x.validate_user_last_name(data.get('last_name'))
        user_email = x.validate_email(data.get('email'))
        user_password = x.validate_user_password(data.get('password'))
       

        user_hashed_password = generate_password_hash(user_password)

        db, cursor = x.db()

        query = "INSERT INTO users VALUES(%s, %s, %s, %s, %s)"
        cursor.execute(query, (
            user_id,
            user_first_name,
            user_last_name,
            user_email,
            user_hashed_password
        ))

        cursor.execute(
            "INSERT INTO user_dashboard (user_id) VALUES(%s)",
            (user_id,)
        )

        db.commit()

        return jsonify({"message": "User registered successfully"}), 201

    except Exception as ex:
        ic(ex)
        return jsonify({"error": str(ex)}), 500

    finally:
        if "cursor" in locals():
            cursor.close()
        if "db" in locals():
            db.close()


##############################
@app.post('/login')
def login():
    try:
        data = request.get_json()

        user_email = x.validate_email(data.get('email'))
        user_password = x.validate_user_password(data.get('password'))
        db, cursor = x.db()
        query = 'SELECT * FROM users WHERE user_email = %s'
        cursor.execute(query, (user_email,))
        user = cursor.fetchone()

        if not user:
            return "Invalid credentials", 400
        if not check_password_hash(user['user_hashed_password'], user_password):
            return "Invalid credentials", 400
        
        user.pop('user_hashed_password')
        session['user'] = user
        
        return "Login successful", 200

    except Exception as ex:
        ic(ex)
        if "company_exception email" in str(ex):
            return "Email invalid", 400
        
        if "company_exception user_password" in str(ex):
            return f"Password must be {x.USER_PASSWORD_MIN} to {x.USER_PASSWORD_MAX} characters", 400
        
        return "System under maintenance", 500

    finally:
        if "cursor" in locals(): cursor.close()
        if "db" in locals(): db.close()




############### GET ###############
@app.get('/dashboard')
def show_user_dashboard():
    try:
        user = session.get('user')

        if not user:
            return "No user", 400

        user_id = user.get('user_pk')

        db, cursor = x.db()

        query = 'SELECT * FROM user_dashboard WHERE user_id = %s'
        cursor.execute(query, (user_id,))

        dashboard = cursor.fetchone()

        return jsonify({
            "loggedIn": True,
            "user": user,
            "dashboard": dashboard
        })

    except Exception as ex:
        ic(ex)
        return jsonify({"error": str(ex)}), 500

    finally:
        if "cursor" in locals():
            cursor.close()

        if "db" in locals():
            db.close()

