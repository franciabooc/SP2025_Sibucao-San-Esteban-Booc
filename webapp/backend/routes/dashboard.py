# routes/dashboard.py

from flask import Blueprint, jsonify
from db import get_connection

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/dashboard', methods=['GET'])
def get_dashboard_counts():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        # --- Basic Totals ---
        cursor.execute("SELECT COUNT(*) AS total_buildings FROM bldg")
        total_buildings = cursor.fetchone()["total_buildings"]

        cursor.execute("SELECT COUNT(*) AS total_rooms FROM rooms")
        total_rooms = cursor.fetchone()["total_rooms"]

        cursor.execute("SELECT COUNT(*) AS total_users FROM app_user")
        total_users = cursor.fetchone()["total_users"]

        cursor.close()
        conn.close()

        # --- JSON Response ---
        return jsonify({
            "total_buildings": total_buildings,
            "total_rooms": total_rooms,
            "total_users": total_users
        })

    except Exception as e:
        print("❌ Dashboard error:", e)
        return jsonify({"error": str(e)}), 500
