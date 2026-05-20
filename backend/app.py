from carwash_locations import WASH_WORLD_LOCATIONS

from flask import Flask, render_template, request, jsonify, session
import uuid
import time
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


import x
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required

from flask_cors import CORS


from icecream import ic
ic.configureOutput(prefix=f"_____ | ", includeContext=True)

app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = "super-secret-key"
jwt = JWTManager(app)

app.secret_key = "your_secret_key"

############### GET ###############
@app.get("/")
def show_index():
    return "This is the index page"


@app.get('/locations')
def get_locations():
    return jsonify(WASH_WORLD_LOCATIONS)


@app.get('/locations/<id>')
def get_location(id):
    for location in WASH_WORLD_LOCATIONS:
        if location['id'] == id:
            return jsonify(location)
    return jsonify({'Error': 'Location not found'}), 400



############### POST ###############

@app.post('/register-user')
def register_user():
    try:
        data = request.get_json()

        user_id = uuid.uuid4().hex
        user_verification_pk = uuid.uuid4().hex

        user_verified_at = int(time.time())

        verification_link = f"http://127.0.0.1:3000/verify-user/{user_verification_pk}"

        ic("INCOMING DATA: ", data)

        user_first_name = x.validate_user_first_name(data.get('name'))
        user_last_name = x.validate_user_last_name(data.get('last_name'))
        user_email = x.validate_email(data.get('email'))
        user_password = x.validate_user_password(data.get('password'))

        user_hashed_password = generate_password_hash(user_password)

        db, cursor = x.db()

        query = """
            INSERT INTO users (
                user_id,
                user_first_name,
                user_last_name,
                user_email,
                user_hashed_password,
                user_verification_key,
                user_verified_at
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (
            user_id,
            user_first_name,
            user_last_name,
            user_email,
            user_hashed_password,
            user_verification_pk,
            user_verified_at
        ))

        cursor.execute(
            "INSERT INTO user_dashboard (user_id) VALUES(%s)",
            (user_id,)
        )

        db.commit()

        html = f'<a href="{verification_link}">Verify your account</a>'
        send_email(html, user_email)

        return jsonify({"message": "User registered successfully"}), 201

    except Exception as ex:
        ic(ex)
        return jsonify({"error": str(ex)}), 500

    finally:
        if "cursor" in locals():
            cursor.close()
        if "db" in locals():
            db.close()


@app.post('/verify-user/<verification_key>')
def verify_user(verification_key):
    try:
        db, cursor = x.db()

        user_verified_at = int(time.time())

        query = """
            UPDATE users
            SET user_verified_at = %s
            WHERE user_verification_key = %s
            AND user_verified_at IS NULL
        """

        cursor.execute(query, (
            user_verified_at,
            verification_key
        ))

        db.commit()

        if cursor.rowcount == 0:
            return jsonify({
                "message": "Invalid or already verified link"
            }), 400

        return jsonify({
            "message": "User verified successfully"
        }), 200

    except Exception as ex:
        ic(ex)
        return jsonify({"error": "Verification failed"}), 500

    finally:
        if "cursor" in locals():
            cursor.close()
        if "db" in locals():
            db.close()


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

        if not user.get("user_verified_at"):
            return "Please verify your email first", 403

        if not user_email:
            return jsonify({"error": "Email is required"}), 400

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
        if "cursor" in locals():
            cursor.close()
        if "db" in locals():
            db.close()



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



def send_email(html, receiver_email):
    try:
        sender_email = "viggovs1303@gmail.com"
        password = "wwtm zhlq gtfj oein"
        receiver_email = receiver_email

        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = receiver_email
        message["Subject"] = "Please verify your account"

        message.attach(MIMEText(html, "html"))

        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, message.as_string())

        ic("E-mail sent successfully")
        return "E-mail sent"

    except Exception as ex:
        ic(ex)
        return "E-mail not sent", 500