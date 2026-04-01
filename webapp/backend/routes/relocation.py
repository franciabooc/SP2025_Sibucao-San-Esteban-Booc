from flask import Blueprint, jsonify
from db import get_connection

relocation_bp = Blueprint('relocation', __name__)

@relocation_bp.route('/relocation', methods=['GET'])
def get_relocations():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        # Fetch all relocations WITHOUT room & building IDs
        cursor.execute("""
            SELECT
                id,
                previous_location,
                new_location,
                date_start,
                end_date,
                description,
                status
            FROM relocation
            ORDER BY date_start DESC
        """)
        rows = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(rows)
    except Exception as e:
        print("❌ Relocation route error:", e)
        return jsonify({"error": str(e)}), 500
