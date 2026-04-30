from flask import Flask, render_template, request, jsonify
from flask import request
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
