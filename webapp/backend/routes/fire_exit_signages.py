from flask import Blueprint, jsonify
from db import get_connection

# Create the blueprint
fireexitsignages_bp = Blueprint("fire_exit_signages", __name__)

@fireexitsignages_bp.route("/fire_exit_signages", methods=["GET"])
def get_fire_exit_signages():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        # Query the table with correct name and column mapping
        cursor.execute("""
            SELECT
                id,
                building_name,
                code,
                location,
                functional,
                not_functional,
                remarks
            FROM fire_exit_signages
            ORDER BY id ASC
        """)

        rows = cursor.fetchall()

        # Ensure booleans and empty remarks are returned correctly
        for row in rows:
            row["functional"] = bool(row["functional"]) if row["functional"] is not None else False
            row["not_functional"] = bool(row["not_functional"]) if row["not_functional"] is not None else False
            row["remarks"] = row["remarks"] or ""

        cursor.close()
        conn.close()

        return jsonify(rows), 200

    except Exception as e:
        print("❌ Fire Exit Signages route error:", e)
        return jsonify({"error": str(e)}), 500
