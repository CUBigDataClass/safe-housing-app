from flask import Flask
from flask_cors import CORS
import sys
from backend.views.sample_view import heartbeat_app

# This is the main file to create the instance of flask application
sys.path.insert(0, "/backend")

def register_blueprints(app):
    app.register_blueprint(heartbeat_app)

def run_app(app):
    app.run(host='0.0.0.0', debug=True)

if __name__ == "__main__":
    app = Flask(__name__)
    CORS(app)
    register_blueprints(app)
    run_app(app)