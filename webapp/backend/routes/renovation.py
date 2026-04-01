# /backend/routes/renovation.py
from flask import Blueprint, jsonify
from db import get_connection

renovation_bp = Blueprint('renovation', __name__)

@renovation_bp.route('/renovation', methods=['GET'])
def get_renovations():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                id,
                building,
                room,
                date_start,
                end_date,
                description,
                status
            FROM renovation
            ORDER BY date_start ASC
        """)
        rows = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(rows)
    except Exception as e:
        print("❌ Renovation route error:", e)
        return jsonify({"error": str(e)}), 500
