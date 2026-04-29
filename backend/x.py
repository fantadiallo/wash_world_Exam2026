import os
import mysql.connector
from flask import request, make_response
import re # Regular expressions also called Regex
from functools import wraps
from icecream import ic
from werkzeug.utils import secure_filename
import uuid

ic.configureOutput(prefix=f"_____ | ", includeContext=True)

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

##############################
def db():
    try:
        db = mysql.connector.connect(
            host = "mariadb",
            user = "root",  
            password = "password",
            database = "wash_world_exam"
        )
        cursor = db.cursor(dictionary=True)
        return db, cursor
    except Exception as e:
        print(e, flush=True)
        raise Exception("Database under maintenance", 500)


##############################
def no_cache(view):
    @wraps(view)
    def no_cache_view(*args, **kwargs):
        response = make_response(view(*args, **kwargs))
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"
        return response
    return no_cache_view


##############################
USER_FIRST_NAME_MIN = 2
USER_FIRST_NAME_MAX = 20
REGEX_USER_FIRST_NAME = f"^.{{{USER_FIRST_NAME_MIN},{USER_FIRST_NAME_MAX}}}$"
def validate_user_first_name():
    user_first_name = request.form.get("user_first_name", "").strip()
    if not re.match(REGEX_USER_FIRST_NAME, user_first_name):
        raise Exception("company_exception user_first_name")
    return user_first_name


##############################
USER_LAST_NAME_MIN = 2
USER_LAST_NAME_MAX = 20
REGEX_USER_LAST_NAME = f"^.{{{USER_LAST_NAME_MIN},{USER_LAST_NAME_MAX}}}$"
def validate_user_last_name():
    user_last_name = request.form.get("user_last_name", "").strip()
    if not re.match(REGEX_USER_LAST_NAME, user_last_name):
        raise Exception("company_exception user_last_name")
    return user_last_name


##############################
REGEX_EMAIL = "^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$"
def validate_email( email ):
    email = email.strip()
    if not re.match(REGEX_EMAIL, email): 
        raise Exception("company_exception email")
    return email


##############################
USER_PASSWORD_MIN = 8
USER_PASSWORD_MAX = 50
REGEX_USER_PASSWORD = f"^.{{{USER_PASSWORD_MIN},{USER_PASSWORD_MAX}}}$"
def validate_user_password( password ):
    user_password = password.strip()
    if not re.match(REGEX_USER_PASSWORD, user_password):
        raise Exception("company_exception user_password")
    return user_password


##############################
# 0 to 9 letters a to f
REGEX_UUID4 = "^[0-9a-f]{32}$"
def validate_uuid4(key_x):
    ic(key_x)
    uuid = key_x.strip()
    ic(uuid)
    if not re.match(REGEX_UUID4, uuid):
        raise Exception("company_exception uuid4 invalid")
    
    return uuid

##############################
REGEX_UUID4_64 = "^[0-9a-f]{64}$"
def validate_uuid4_paranoia(uuid4):
    uuid = uuid4.strip()
    if not re.match(REGEX_UUID4_64, uuid):
        raise Exception("company_exception paranoia")
    return uuid


##############################
REGEX_IMAGE = r"^.+\.(jpg|jpeg|png|gif|webp|bmp|svg)$"

UPLOAD_FOLDER = 'uploads'
def validate_image(image):
    if not image:
        raise Exception('company_exception image missing')

    if image.filename.strip() == '':
        raise Exception('company_exception image empty')

    original_image_name = secure_filename(image.filename)
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    filepath = os.path.join(UPLOAD_FOLDER, original_image_name)
    image.save(filepath)
    
    return original_image_name


##############################
IMAGE_TITLE_MIN = 2
IMAGE_TITLE_MAX = 20
REGEX_IMAGE_TITLE = f"^.{{{IMAGE_TITLE_MIN},{IMAGE_TITLE_MAX}}}$"
def validate_image_title(image_title):
    image_title = request.form.get("image_title", "").strip()
    if not re.match(REGEX_IMAGE_TITLE, image_title):
        raise Exception("company_exception image_title")
    return image_title


##############################
IMAGE_ALT_MIN = 2
IMAGE_ALT_MAX = 20
REGEX_IMAGE_ALT = f"^.{{{IMAGE_ALT_MIN},{IMAGE_ALT_MAX}}}$"
def validate_image_alt(image_alt):
    image_alt = request.form.get("image_alt", "").strip()
    if not re.match(REGEX_IMAGE_ALT, image_alt):
        raise Exception("company_exception image_alt")
    return image_alt

##############################
def send_email(subject, html):
    try:    
        # Create a gmail
        # Enable (turn on) 2 step verification/factor in the google account manager
        # Visit: https://myaccount.google.com/apppasswords
        # Copy the key : 

        # Email and password of the sender's Gmail account
        sender_email = "viggovs1303@gmail.com"
        password = "blzj ynkc ysza hdgt"  # If 2FA is on, use an App Password instead

        # Receiver email address
        receiver_email = "viggovs1303@gmail.com"
        
        # Create the email message
        message = MIMEMultipart()
        message["From"] = "Washworld"
        message["To"] = receiver_email
        message["Subject"] = subject

        # Body of the email
        # body = f"""<h1>Hi</h1><h2>Hi again</h2>"""
        message.attach(MIMEText(html, "html"))

        # Connect to Gmail's SMTP server and send the email
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()  # Upgrade the connection to secure
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, message.as_string())
        ic("Email sent successfully!")

        return "email sent"
       
    except Exception as ex:
        return "cannot send email", 500
    finally:
        pass
