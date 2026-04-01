# /backend/routes/logs.py
from flask import Blueprint, request, jsonify
from db import get_connection
from datetime import datetime

logs_bp = Blueprint("logs", __name__)

def record_log(admin_email, action, object_type, object_name):
    """
    Helper to insert a log into the logs table using admin's email.
    """
    timestamp = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO logs (admin, action, object_type, object_name, timestamp)
            VALUES (%s, %s, %s, %s, %s)
        """, (admin_email, action, object_type, object_name, timestamp))
        conn.commit()
        cursor.close()
        conn.close()
        return {
            "admin": admin_email,
            "action": action,
            "object_type": object_type,
            "object_name": object_name,
            "timestamp": timestamp
        }
    except Exception as e:
        print("❌ Failed to record log:", e)
        return None

# GET all logs
@logs_bp.route("/admin/logs", methods=["GET"])
def get_logs():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT
                id,
                admin,
                action,
                object_type,
                object_name,
                timestamp
            FROM logs
            ORDER BY timestamp DESC
        """)
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(rows)
    except Exception as e:
        print("❌ Logs GET error:", e)
        return jsonify({"error": str(e)}), 500

# POST a new log manually
@logs_bp.route("/admin/logs", methods=["POST"])
def add_log():
    try:
        data = request.get_json()
        # Get admin email from request headers (sent from frontend after login)
        admin_email = request.headers.get("x-admin-email", "Unknown")

        action = data.get("action")
        object_type = data.get("object_type")
        object_name = data.get("object_name")

        if not all([action, object_type, object_name]):
            return jsonify({"error": "Missing required fields"}), 400

        log_entry = record_log(admin_email, action, object_type, object_name)
        if log_entry is None:
            return jsonify({"error": "Failed to save log"}), 500

        return jsonify({"message": "Log added", "log": log_entry}), 201

    except Exception as e:
        print("❌ Logs POST error:", e)
        return jsonify({"error": str(e)}), 500
