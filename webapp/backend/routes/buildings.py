# /backend/routes/building.py
from flask import Blueprint, jsonify
from db import get_connection

buildings_bp = Blueprint('buildings', __name__)

@buildings_bp.route('/buildings', methods=['GET'])
def get_buildings():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                id,
                bldg_name,
                type_of_structure,
                no_of_storey,
                area_footprint_sqm,
                total_area_sqm,
                date_constructed
            FROM bldg
            ORDER BY id
        """)

        rows = cursor.fetchall()

        cursor.close()
        conn.close()

        if not rows:
            return jsonify({"message": "No records found"}), 200

        return jsonify(rows), 200

    except Exception as e:
        print("❌ Database error:", e)
        return jsonify({"error": str(e)}), 500
