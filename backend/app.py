from flask import Flask, render_template, request
from flask import request
import uuid, time
from flask import send_from_directory
 
import x
 
from icecream import ic
ic.configureOutput(prefix=f"_____ | ", includeContext=True)
 
app = Flask(__name__)
 
@app.route('/')
def show_index():
    return "OK"