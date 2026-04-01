# /backend/routes/announcement.py
from flask import Blueprint, request, jsonify
from db import get_connection
from datetime import datetime

announcement_bp = Blueprint("announcement", __name__)

# ---------------------------
# GET ALL ANNOUNCEMENTS
# ---------------------------
@announcement_bp.route("/announcements", methods=["GET"])
def get_announcements():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT 
                announcement_id,
                title,
                message,
                posted_at
            FROM announcements
            ORDER BY posted_at DESC
        """)

        rows = cursor.fetchall()
        cursor.close()
        conn.close()

        if not rows:
            return jsonify({"message": "No announcements found"}), 200

        return jsonify(rows), 200

    except Exception as e:
        print("❌ Database error:", e)
        return jsonify({"error": str(e)}), 500


# ---------------------------
# POST NEW ANNOUNCEMENT
# ---------------------------
@announcement_bp.route("/announcements", methods=["POST"])
def post_announcement():
    try:
        data = request.get_json()
        title = data.get("title", "")
        message = data.get("message", "").strip()

        if not message:
            return jsonify({"error": "Message cannot be empty"}), 400

        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO announcements (title, message, posted_at)
            VALUES (%s, %s, %s)
        """, (title, message, datetime.now()))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Announcement posted successfully"}), 201

    except Exception as e:
        print("❌ Database error:", e)
        return jsonify({"error": str(e)}), 500
