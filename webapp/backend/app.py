import os
import subprocess
import time
from flask import Flask
from flask_cors import CORS

# =========================
# MySQL Startup (XAMPP)
# =========================
mysql_path = r"C:\xampp\mysql\bin\mysqld.exe"

try:
    # Check if mysqld.exe is running
    tasklist = subprocess.check_output('tasklist', shell=True).decode()
    if 'mysqld.exe' not in tasklist:
        print("Starting MySQL server from XAMPP...")
        subprocess.Popen(
            [mysql_path],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
        time.sleep(4)  # Wait a few seconds for MySQL to start
    else:
        print("MySQL server is already running.")
except Exception as e:
    print(f"❌ Could not start MySQL automatically: {e}")

# =========================
# Initialize Flask app
# =========================
app = Flask(__name__, static_folder="../frontend/assets")
CORS(app)

# =========================
# Import and register routes
# =========================
from routes.buildings import buildings_bp
from routes.landmark import landmark_bp
from routes.pathway import pathway_bp
from routes.login import login_bp
from routes.dashboard import dashboard_bp
from routes.rooms import rooms_bp
from routes.users import users_bp
from routes.emergency_light import emergencylight_bp
from routes.fire_exit_signages import fireexitsignages_bp
from routes.fire_extinguisher import fireextinguisher_bp 
from routes.renovation import renovation_bp 
from routes.relocation import relocation_bp 
from routes.feedback import feedback_bp
from routes.logs import logs_bp
from routes.announcement import announcement_bp

# Register all blueprints
app.register_blueprint(buildings_bp)
app.register_blueprint(landmark_bp)
app.register_blueprint(pathway_bp)
app.register_blueprint(login_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(rooms_bp)
app.register_blueprint(users_bp)
app.register_blueprint(emergencylight_bp)
app.register_blueprint(fireexitsignages_bp)
app.register_blueprint(fireextinguisher_bp)
app.register_blueprint(renovation_bp)
app.register_blueprint(relocation_bp)
app.register_blueprint(feedback_bp)
app.register_blueprint(logs_bp)
app.register_blueprint(announcement_bp)

# =========================
# Root endpoint
# =========================
@app.route("/")
def home():
    return {"message": "Flask backend connected to go_unc database"}

# =========================
# Run Flask app
# =========================
if __name__ == "__main__":
    app.run(debug=True)
