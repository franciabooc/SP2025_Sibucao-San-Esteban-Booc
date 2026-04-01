# /backend/routes/emergencylight.py
from flask import Blueprint, jsonify
from db import get_connection

emergencylight_bp = Blueprint('emergency_light', __name__)

@emergencylight_bp.route('/emergency_lights', methods=['GET'])
def get_emergency_lights():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        # ✅ Use the correct column name for ORDER BY
        cursor.execute("""
            SELECT 
                emergency_light_id AS id,   -- map to 'id' for frontend
                building_name,
                code_no,
                brand,
                location,
                functional,
                not_functional,
                remarks,
                created_at
            FROM emergency_light
            ORDER BY emergency_light_id ASC
        """)
        rows = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(rows)
    except Exception as e:
        print("❌ Emergency Light route error:", e)
        return jsonify({"error": str(e)}), 500
