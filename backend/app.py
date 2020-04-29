from flask import Flask
import sys
print(sys.path)
sys.path.insert(0, "/")

def register_blueprints(app):
    from views.sample_view import heartbeat_app
    app.register_blueprint(heartbeat_app)

def run_app(app):
    app.run(host='0.0.0.0', debug=True)

if __name__ == "__main__":
    app = Flask(__name__)
    register_blueprints(app)
    run_app(app)