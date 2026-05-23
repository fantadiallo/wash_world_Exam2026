from flask import Flask, render_template, request, jsonify
import uuid, time
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

import x

from icecream import ic
ic.configureOutput(prefix=f"_____ | ", includeContext=True)

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = "super-secret-key-change-later"
jwt = JWTManager(app) 


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
        user_verified_at = int(time.time())

        db, cursor = x.db()

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

        html = f"""
            <h1>Welcome to Wash World</h1>
            <p>Hi {user_first_name}, your account has been created.</p>
        """

        x.send_email("Welcome to Wash World", html)

        return jsonify({
            "success": True,
            "message": "User registered successfully",
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
                user_hashed_password
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