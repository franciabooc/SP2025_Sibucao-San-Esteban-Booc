# /backend/routes/pathway.py
from flask import Blueprint, jsonify
from db import get_connection

pathway_bp = Blueprint('pathway', __name__)

@pathway_bp.route('/pathway', methods=['GET'])
def get_pathways():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        # Fetch only pathway info (no building_ids)
        cursor.execute("""
            SELECT 
                id,
                name,
                description,
                type
            FROM pathway
            ORDER BY id
        """)

        rows = cursor.fetchall()

        cursor.close()
        conn.close()

        if not rows:
            return jsonify({"message": "No pathways found"}), 200

        return jsonify(rows), 200

    except Exception as e:
        print("❌ Database error:", e)
        return jsonify({"error": str(e)}), 500
