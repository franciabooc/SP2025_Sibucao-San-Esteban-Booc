from flask import Blueprint, jsonify
from db import get_connection

rooms_bp = Blueprint('rooms', __name__)

@rooms_bp.route('/rooms', methods=['GET'])
def get_rooms():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        # Fetch all rooms with updated column names
        cursor.execute("""
    SELECT 
        room_id,     
        building,
        room_flr,
        room_name,  
        occupant,
        classification,
        area_sqm,
        current_occupants,
        no_of_units,
        capacity,
        type
    FROM rooms
    ORDER BY room_id
""")


        rows = cursor.fetchall()

        cursor.close()
        conn.close()

        if not rows:
            return jsonify({"message": "No rooms found"}), 200

        return jsonify(rows), 200

    except Exception as e:
        print("❌ Database error:", e)
        return jsonify({"error": str(e)}), 500
