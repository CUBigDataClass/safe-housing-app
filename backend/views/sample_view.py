from flask import Blueprint
from helpers.flask_response import json_response

heartbeat_app = Blueprint('heartbeat_app', __name__)

@heartbeat_app.route('/')
def heartbeat():
    return json_response({"status": "OK"})