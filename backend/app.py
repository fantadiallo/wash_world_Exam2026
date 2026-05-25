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
            None,
            None,
            None,
            None
        ))

        db.commit()

      
        html = f"""
        <h1>Welcome to Wash World</h1>
        <p>Hi {user_first_name}, your account has been created.</p>
        <p>You can now log in and use your account.</p>
        """

        send_email(user_email, "Welcome to Wash World", html)

        return jsonify({
            "success": True,
            "message": "User registered successfully. Welcome email sent.",
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

################################################

@app.get("/subscription-types")
def get_subscription_types():
    try:
        db, cursor = x.db()

        q = """
            SELECT
                st.subscription_type_id,
                st.subscription_name,
                st.subscription_price,
                st.subscription_description,
                sp.perk_text
            FROM subscription_types st
            LEFT JOIN subscription_perks sp
                ON st.subscription_type_id = sp.subscription_type_id
            ORDER BY st.subscription_name ASC
        """

        cursor.execute(q)
        rows = cursor.fetchall()

        if not rows:
            return jsonify({
                "success": True,
                "data": []
            }), 200

        subscriptions_map = {}

        for row in rows:
            subscription_type_id = row["subscription_type_id"]

            if subscription_type_id not in subscriptions_map:
                subscriptions_map[subscription_type_id] = {
                    "id": row["subscription_type_id"],
                    "name": row["subscription_name"],
                    "price": float(row["subscription_price"]) if row["subscription_price"] is not None else 0,
                    "description": row["subscription_description"],
                    "features": []
                }

            if row["perk_text"]:
                subscriptions_map[subscription_type_id]["features"].append(row["perk_text"])

        subscription_types = list(subscriptions_map.values())

        return jsonify({
            "success": True,
            "data": subscription_types
        }), 200

    except Exception as ex:
        ic(ex)
        return jsonify({
            "success": False,
            "message": "Could not fetch subscription types",
            "error": str(ex)
        }), 500

    finally:
        if "cursor" in locals():
            cursor.close()
        if "db" in locals():
            db.close()


###########################################################

@app.post("/subscriptions")
@jwt_required()
def create_subscription():
    try:
        data = request.get_json()

        user_id = get_jwt_identity()
        subscription_type_id = x.validate_subscription_type_id(
            data.get("subscription_type_id", "")
        )

        dates = x.get_subscription_dates()
        subscription_id = uuid.uuid4().hex
        subscription_status = "active"

        db, cursor = x.db()

        # 1. Check user exists
        q_user = """
            SELECT user_id
            FROM users
            WHERE user_id = %s
            LIMIT 1
        """
        cursor.execute(q_user, (user_id,))
        user = cursor.fetchone()

        if user is None:
            return jsonify({
                "success": False,
                "message": "User not found"
            }), 404

        # 2. Check subscription type exists
        q_subscription_type = """
            SELECT
                subscription_type_id,
                subscription_name,
                subscription_price,
                subscription_description
            FROM subscription_types
            WHERE subscription_type_id = %s
            LIMIT 1
        """
        cursor.execute(q_subscription_type, (subscription_type_id,))
        subscription_type = cursor.fetchone()

        if subscription_type is None:
            return jsonify({
                "success": False,
                "message": "Subscription type not found"
            }), 404

        # 3. Check if user already has an active subscription
        q_existing = """
            SELECT subscription_id
            FROM subscriptions
            WHERE user_id = %s
              AND subscription_status = %s
            LIMIT 1
        """
        cursor.execute(q_existing, (user_id, "active"))
        existing_subscription = cursor.fetchone()

        if existing_subscription is not None:
            return jsonify({
                "success": False,
                "message": "User already has an active subscription"
            }), 409

        # 4. Insert into subscriptions
        q_insert_subscription = """
            INSERT INTO subscriptions (
                subscription_id,
                user_id,
                subscription_type_id,
                subscription_status,
                subscription_created_at,
                subscription_start_date,
                subscription_renewal_date
            ) VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(q_insert_subscription, (
            subscription_id,
            user_id,
            subscription_type_id,
            subscription_status,
            dates["created_at"],
            dates["start_date"],
            dates["renewal_date"]
        ))

        # 5. Update or create dashboard row
        q_dashboard = """
            INSERT INTO user_dashboard (
                user_id,
                subscription_type_id
            ) VALUES (%s, %s)
            ON DUPLICATE KEY UPDATE
                subscription_type_id = VALUES(subscription_type_id)
        """
        cursor.execute(q_dashboard, (
            user_id,
            subscription_type_id
        ))

        db.commit()

        return jsonify({
            "success": True,
            "message": "Subscription created successfully",
            "data": {
                "subscription_id": subscription_id,
                "user_id": user_id,
                "subscription_type_id": subscription_type["subscription_type_id"],
                "subscription_name": subscription_type["subscription_name"],
                "subscription_price": float(subscription_type["subscription_price"]) if subscription_type["subscription_price"] is not None else 0,
                "subscription_description": subscription_type["subscription_description"],
                "subscription_status": subscription_status,
                "subscription_created_at": dates["created_at"].isoformat(),
                "subscription_start_date": dates["start_date"].isoformat(),
                "subscription_renewal_date": dates["renewal_date"].isoformat()
            }
        }), 201

    except Exception as ex:
        ic(ex)

        if "company_exception subscription_type_id" in str(ex):
            return jsonify({
                "success": False,
                "message": "Invalid subscription type id"
            }), 400

        return jsonify({
            "success": False,
            "message": "Could not create subscription",
            "error": str(ex)
        }), 500

    finally:
        if "cursor" in locals():
            cursor.close()
        if "db" in locals():
            db.close()

###########################################################

@app.get("/subscriptions/user/<user_id>")
@jwt_required()
def get_subscriptions_by_user(user_id):
    try:
        requested_user_id = x.validate_uuid4(user_id)
        token_user_id = get_jwt_identity()

        # Security check:
        # The user in the URL must be the same user as the one in the JWT token.
        if requested_user_id != token_user_id:
            return jsonify({
                "success": False,
                "message": "You are not allowed to view subscriptions for this user"
            }), 403

        db, cursor = x.db()

        # 1. Check that the user exists
        q_user = """
            SELECT 
                user_id,
                user_first_name,
                user_last_name,
                user_email
            FROM users
            WHERE user_id = %s
            LIMIT 1
        """

        cursor.execute(q_user, (requested_user_id,))
        user = cursor.fetchone()

        if user is None:
            return jsonify({
                "success": False,
                "message": "User not found"
            }), 404

        # 2. Fetch subscriptions for this user
        q_subscriptions = """
            SELECT
                s.subscription_id,
                s.user_id,
                s.subscription_type_id,
                s.subscription_status,
                s.subscription_created_at,
                s.subscription_start_date,
                s.subscription_renewal_date,

                st.subscription_name,
                st.subscription_price,
                st.subscription_description,
                st.subscription_icon,

                sp.perk_text
            FROM subscriptions s
            JOIN subscription_types st
                ON s.subscription_type_id = st.subscription_type_id
            LEFT JOIN subscription_perks sp
                ON st.subscription_type_id = sp.subscription_type_id
            WHERE s.user_id = %s
            ORDER BY s.subscription_created_at DESC
        """

        cursor.execute(q_subscriptions, (requested_user_id,))
        rows = cursor.fetchall()

        subscriptions_map = {}

        for row in rows:
            subscription_id = row["subscription_id"]

            if subscription_id not in subscriptions_map:
                subscriptions_map[subscription_id] = {
                    "subscription_id": row["subscription_id"],
                    "user_id": row["user_id"],
                    "subscription_type_id": row["subscription_type_id"],
                    "subscription_name": row["subscription_name"],
                    "subscription_price": float(row["subscription_price"]) if row["subscription_price"] is not None else 0,
                    "subscription_description": row["subscription_description"],
                    "subscription_icon": row["subscription_icon"],
                    "subscription_status": row["subscription_status"],
                    "subscription_created_at": row["subscription_created_at"].isoformat() if row["subscription_created_at"] else None,
                    "subscription_start_date": row["subscription_start_date"].isoformat() if row["subscription_start_date"] else None,
                    "subscription_renewal_date": row["subscription_renewal_date"].isoformat() if row["subscription_renewal_date"] else None,
                    "features": []
                }

            if row["perk_text"]:
                subscriptions_map[subscription_id]["features"].append(row["perk_text"])

        subscriptions = list(subscriptions_map.values())

        active_subscription = None

        for subscription in subscriptions:
            if subscription["subscription_status"] == "active":
                active_subscription = subscription
                break

        return jsonify({
            "success": True,
            "message": "Subscriptions fetched successfully",
            "user": {
                "user_id": user["user_id"],
                "first_name": user["user_first_name"],
                "last_name": user["user_last_name"],
                "email": user["user_email"]
            },
            "has_active_subscription": active_subscription is not None,
            "active_subscription": active_subscription,
            "data": subscriptions
        }), 200

    except Exception as ex:
        ic(ex)

        if "company_exception uuid4 invalid" in str(ex):
            return jsonify({
                "success": False,
                "message": "Invalid user id"
            }), 400

        return jsonify({
            "success": False,
            "message": "Could not fetch subscriptions for user",
            "error": str(ex)
        }), 500

    finally:
        if "cursor" in locals():
            cursor.close()
        if "db" in locals():
            db.close()
