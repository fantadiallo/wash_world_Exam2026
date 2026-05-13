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
        user_pk = uuid.uuid4().hex
        user_first_name = x.validate_user_first_name(request.form.get('user_first_name'))
        user_last_name = x.validate_user_last_name(request.form.get('user_last_name'))
        user_email = x.validate_email(request.form.get('user_email'))
        user_password = x.validate_user_password(request.form.get('user_password'))
        user_confirm_password = x.validate_user_password(request.form.get('confirm_password'))
        user_hashed_password = generate_password_hash(user_password)

        if not user_password == user_confirm_password:
            return "Passwords do not match", 400

        db, cursor = x.db()
        
        # Insert into register_user
        query = "INSERT INTO users VALUES(%s, %s, %s, %s, %s)"
        cursor.execute(query, (user_pk, user_first_name, user_last_name, user_email, user_hashed_password))

        # Insert only user_id into user_dashboard
        query = "INSERT INTO user_dashboard (user_id) VALUES(%s)"
        cursor.execute(query, (user_pk,))

        db.commit()

        return jsonify({"message": "User registered successfully"}), 201

    except Exception as ex:
        ic(ex)
        return jsonify({"error": "Something went wrong"}), 500

    finally:
        if "cursor" in locals():
            cursor.close()
        if "db" in locals():
            db.close()


##############################
@app.post('/login')
def login():
    try:
        user_email = x.validate_email(request.form.get('user_email'))
        user_password = x.validate_user_password(request.form.get('user_password'))
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
        db, cursor = x.db()
        query = 'SELECT * FROM user_dashboard WHERE user_id = %s'

        user_id = session.get('user')['user_id']
        ic(session.get('user'))
        cursor.execute(query, (user_id,))

        dashboard = cursor.fetchone()


        return jsonify(dashboard)

    except Exception as ex:
        ic(ex)
        return "Error loading the dashboard", 500

    finally:
        if "cursor" in locals():
            cursor.close()

        if "db" in locals():
            db.close()

