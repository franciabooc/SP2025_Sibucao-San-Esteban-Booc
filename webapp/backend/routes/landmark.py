# /backend/routes/landmark.py
from flask import Blueprint, jsonify
from db import get_connection

landmark_bp = Blueprint('landmark', __name__)

@landmark_bp.route('/landmarks', methods=['GET'])
def get_landmarks():
    """
    GET /landmarks
    Fetch all landmarks from the database and return as JSON
    """
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        # Select landmarks from the table and map column names for frontend
        cursor.execute("""
            SELECT
                id,           -- maps directly to 'id' for frontend
                name,
                description,
                type
            FROM landmarks
            ORDER BY id ASC
        """)
        rows = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(rows)

    except Exception as e:
        print("❌ Landmark route error:", e)
        return jsonify({"error": str(e)}), 500
