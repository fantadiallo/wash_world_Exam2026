from flask import Flask, render_template, request, jsonify
import uuid, time
from flask import send_from_directory
from flask_cors import CORS

import x

from icecream import ic
ic.configureOutput(prefix=f"_____ | ", includeContext=True)

app = Flask(__name__)
CORS(app)


@app.route('/')
def show_index():
    return "OK"

@app.route('/api/test')
def test_connection():
    return jsonify({
        "success": True,
        "message": "Backend connection works",
        "user": "Fanta",
        "role": "Frontend Developer"
    })
