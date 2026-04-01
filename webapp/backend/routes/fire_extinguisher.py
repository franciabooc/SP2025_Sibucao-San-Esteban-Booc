from flask import Blueprint, jsonify
from db import get_connection

# Create Blueprint
fireextinguisher_bp = Blueprint("fire_extinguishers", __name__)

@fireextinguisher_bp.route("/fire_extinguishers", methods=["GET"])
def get_fire_extinguishers():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                id,
                building,
                code_no,
                location,
                lbs,
                visibility,
                hose,
                locking_pin,
                pressure_gauge,
                operating_instruction,
                content,
                expiration
            FROM fire_extinguishers
            ORDER BY id ASC
        """)

        rows = cursor.fetchall()

        # Normalize boolean fields and null values
        for row in rows:
            row["visibility"] = bool(row["visibility"]) if row["visibility"] is not None else False
            row["hose"] = bool(row["hose"]) if row["hose"] is not None else False
            row["locking_pin"] = bool(row["locking_pin"]) if row["locking_pin"] is not None else False
            row["pressure_gauge"] = bool(row["pressure_gauge"]) if row["pressure_gauge"] is not None else False
            row["operating_instruction"] = bool(row["operating_instruction"]) if row["operating_instruction"] is not None else False
            row["content"] = row["content"] or ""
            row["expiration"] = row["expiration"] or ""

        cursor.close()
        conn.close()

        return jsonify(rows), 200

    except Exception as e:
        print("❌ Fire Extinguisher route error:", e)
        return jsonify({"error": str(e)}), 500
