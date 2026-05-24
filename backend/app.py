from flask import Flask, request, jsonify
import uuid, time
import os
from dotenv import load_dotenv
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

import x

from icecream import ic
ic.configureOutput(prefix=f"_____ | ", includeContext=True)

app = Flask(__name__)

load_dotenv()

CORS(app)

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)


def send_email(receiver_email, subject, html):
    sender_email = os.getenv("SENDER_EMAIL")
    password = os.getenv("EMAIL_PASSWORD")

    message = MIMEMultipart()
    message["From"] = "Wash World"
    message["To"] = receiver_email
    message["Subject"] = subject
    message.attach(MIMEText(html, "html"))

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())


@app.get("/")
def show_index():
    return jsonify({"success": True, "message": "Backend is running"}), 200


@app.post("/register-user")
def register_user():
    try:
        data = request.get_json()

        user_first_name = x.validate_user_first_name(data.get("name", ""))
        user_last_name = x.validate_user_last_name(data.get("last_name", ""))
        user_email = x.validate_email(data.get("email", "")).lower()
        user_password = x.validate_user_password(data.get("password", ""))

        user_id = uuid.uuid4().hex
        hashed_password = generate_password_hash(user_password)
        verification_key = uuid.uuid4().hex
        user_verified_at = 0

        db, cursor = x.db()

        cursor.execute(
            "SELECT user_id FROM users WHERE user_email = %s LIMIT 1",
            (user_email,)
        )

        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({
                "success": False,
                "message": "Email already exists"
            }), 409

        q = "INSERT INTO users VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(q, (
            user_id,
            user_first_name,
            user_last_name,
            user_email,
            hashed_password,
            verification_key,
            user_verified_at,
            None,
            None
        ))

        db.commit()

        verify_link = f"http://127.0.0.1:5000/verify/{verification_key}"

        html = f"""
            <h1>Welcome to Wash World</h1>
            <p>Hi {user_first_name}, your account has been created.</p>
            <p>Please verify your account by clicking the link below:</p>
            <a href="{verify_link}">Verify account</a>
        """

        send_email(user_email, "Welcome to Wash World", html)

        return jsonify({
            "success": True,
            "message": "User registered successfully. Please check your email to verify your account.",
            "user": {
                "user_id": user_id,
                "first_name": user_first_name,
                "last_name": user_last_name,
                "email": user_email
            }
        }), 201

    except Exception as ex:
        ic(ex)

        if "company_exception user_first_name" in str(ex):
            return jsonify({"success": False, "message": "First name must be 2 to 20 characters"}), 400

        if "company_exception user_last_name" in str(ex):
            return jsonify({"success": False, "message": "Last name must be 2 to 20 characters"}), 400

        if "company_exception email" in str(ex):
            return jsonify({"success": False, "message": "Invalid email"}), 400

        if "company_exception user_password" in str(ex):
            return jsonify({"success": False, "message": "Password must be 8 to 50 characters"}), 400

        return jsonify({"success": False, "message": str(ex)}), 500

    finally:
        if "cursor" in locals():
            cursor.close()
        if "db" in locals():
            db.close()


@app.get("/verify/<verification_key>")
def verify_account(verification_key):
    try:
        verification_key = verification_key.strip()

        if not verification_key:
            return jsonify({
                "success": False,
                "message": "Invalid verification key"
            }), 400

        db, cursor = x.db()

        cursor.execute("""
            SELECT user_id, user_verified_at
            FROM users
            WHERE user_verification_key = %s
            LIMIT 1
        """, (verification_key,))

        user = cursor.fetchone()

        if user is None:
            return jsonify({
                "success": False,
                "message": "Invalid verification key"
            }), 400

        if user["user_verified_at"] != 0:
            return jsonify({
                "success": True,
                "message": "Account already verified"
            }), 200

        verified_at = int(time.time())

        cursor.execute("""
            UPDATE users
            SET user_verified_at = %s
            WHERE user_id = %s
        """, (verified_at, user["user_id"]))

        db.commit()

        return jsonify({
            "success": True,
            "message": "Account verified successfully"
        }), 200

    except Exception as ex:
        ic(ex)
        return jsonify({"success": False, "message": str(ex)}), 500

    finally:
        if "cursor" in locals():
            cursor.close()
        if "db" in locals():
            db.close()


@app.post("/login-user")
def login_user():
    try:
        data = request.get_json()

        user_email = x.validate_email(data.get("email", "")).lower()
        user_password = x.validate_user_password(data.get("password", ""))

        db, cursor = x.db()

        q = """
            SELECT 
                user_id,
                user_first_name,
                user_last_name,
                user_email,
                user_hashed_password,
                user_verified_at
            FROM users
            WHERE user_email = %s
            LIMIT 1
        """

        cursor.execute(q, (user_email,))
        user = cursor.fetchone()

        if user is None:
            return jsonify({"success": False, "message": "Invalid email or password"}), 401

        if not check_password_hash(user["user_hashed_password"], user_password):
            return jsonify({"success": False, "message": "Invalid email or password"}), 401

        if user["user_verified_at"] == 0:
            return jsonify({
                "success": False,
                "message": "Please verify your email before logging in"
            }), 403

        access_token = create_access_token(identity=user["user_id"])

        return jsonify({
            "success": True,
            "message": "Login successful",
            "access_token": access_token,
            "user": {
                "user_id": user["user_id"],
                "first_name": user["user_first_name"],
                "last_name": user["user_last_name"],
                "email": user["user_email"]
            }
        }), 200

    except Exception as ex:
        ic(ex)

        if "company_exception email" in str(ex):
            return jsonify({"success": False, "message": "Invalid email"}), 400

        if "company_exception user_password" in str(ex):
            return jsonify({"success": False, "message": "Invalid password"}), 400

        return jsonify({"success": False, "message": str(ex)}), 500

    finally:
        if "cursor" in locals():
            cursor.close()
        if "db" in locals():
            db.close()


@app.post("/forgot-password")
def forgot_password():
    try:
        data = request.get_json()

        user_email = x.validate_email(data.get("email", "")).lower()

        db, cursor = x.db()

        cursor.execute("""
            SELECT user_id, user_first_name, user_email
            FROM users
            WHERE user_email = %s
            LIMIT 1
        """, (user_email,))

        user = cursor.fetchone()

        if user is None:
            return jsonify({
                "success": True,
                "message": "If the email exists, a reset email has been sent"
            }), 200

        reset_token = uuid.uuid4().hex
        reset_token_expires_at = int(time.time()) + 3600

        cursor.execute("""
            UPDATE users
            SET reset_token = %s,
                reset_token_expires_at = %s
            WHERE user_id = %s
        """, (
            reset_token,
            reset_token_expires_at,
            user["user_id"]
        ))

        db.commit()

        html = f"""
            <h1>Reset your password</h1>
            <p>Hi {user["user_first_name"]}, use this token to reset your password:</p>
            <p>{reset_token}</p>
        """

        send_email(user_email, "Reset your Wash World password", html)

        return jsonify({
            "success": True,
            "message": "Reset email sent"
        }), 200

    except Exception as ex:
        ic(ex)

        if "company_exception email" in str(ex):
            return jsonify({"success": False, "message": "Invalid email"}), 400

        return jsonify({"success": False, "message": str(ex)}), 500

    finally:
        if "cursor" in locals():
            cursor.close()
        if "db" in locals():
            db.close()


@app.post("/reset-password")
def reset_password():
    try:
        data = request.get_json()

        reset_token = data.get("reset_token", "").strip()
        new_password = x.validate_user_password(data.get("password", ""))

        if not reset_token:
            return jsonify({
                "success": False,
                "message": "Reset token is required"
            }), 400

        db, cursor = x.db()

        cursor.execute("""
            SELECT user_id, reset_token_expires_at
            FROM users
            WHERE reset_token = %s
            LIMIT 1
        """, (reset_token,))

        user = cursor.fetchone()

        if user is None:
            return jsonify({
                "success": False,
                "message": "Invalid reset token"
            }), 400

        if int(user["reset_token_expires_at"]) < int(time.time()):
            return jsonify({
                "success": False,
                "message": "Reset token expired"
            }), 400

        hashed_password = generate_password_hash(new_password)

        cursor.execute("""
            UPDATE users
            SET user_hashed_password = %s,
                reset_token = NULL,
                reset_token_expires_at = NULL
            WHERE user_id = %s
        """, (
            hashed_password,
            user["user_id"]
        ))

        db.commit()

        return jsonify({
            "success": True,
            "message": "Password updated successfully"
        }), 200

    except Exception as ex:
        ic(ex)

        if "company_exception user_password" in str(ex):
            return jsonify({"success": False, "message": "Password must be 8 to 50 characters"}), 400

        return jsonify({"success": False, "message": str(ex)}), 500

    finally:
        if "cursor" in locals():
            cursor.close()
        if "db" in locals():
            db.close()


@app.get("/profile")
@jwt_required()
@x.no_cache
def profile():
    try:
        user_id = get_jwt_identity()

        db, cursor = x.db()

        q = """
            SELECT 
                user_id,
                user_first_name,
                user_last_name,
                user_email
            FROM users
            WHERE user_id = %s
            LIMIT 1
        """

        cursor.execute(q, (user_id,))
        user = cursor.fetchone()

        if user is None:
            return jsonify({"success": False, "message": "User not found"}), 404

        return jsonify({
            "success": True,
            "user": user
        }), 200

    except Exception as ex:
        ic(ex)
        return jsonify({"success": False, "message": str(ex)}), 500

    finally:
        if "cursor" in locals():
            cursor.close()
        if "db" in locals():
            db.close()