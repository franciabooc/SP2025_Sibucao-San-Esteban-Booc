# feedback.py
from flask import Blueprint, request, jsonify
from db import get_connection
from datetime import datetime

feedback_bp = Blueprint("feedback", __name__)

# ------------------- GET FEEDBACK -------------------
@feedback_bp.route("/feedback", methods=["GET"])
def get_feedback():
    conn = None
    cursor = None
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                feedback_id,
                email,
                category,
                message,
                timestamp,
                status,
                reply
            FROM feedback
            ORDER BY timestamp DESC
        """)

        data = cursor.fetchall()

        # Convert datetime to string for JSON
        for f in data:
            if isinstance(f.get("timestamp"), datetime):
                f["timestamp"] = f["timestamp"].strftime("%Y-%m-%d %H:%M:%S")
            f["reply"] = f.get("reply") or ""

        return jsonify(data), 200

    except Exception as e:
        print("❌ Feedback fetch error:", e)
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor: cursor.close()
        if conn: conn.close()


# ------------------- UPDATE FEEDBACK -------------------
@feedback_bp.route("/feedback/update/<int:feedback_id>", methods=["POST"])
def update_feedback(feedback_id):
    data = request.get_json() or {}
    status = data.get("status")
    reply = data.get("reply", "")

    if not status:
        return jsonify({"error": "Status is required"}), 400

    conn = None
    cursor = None
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            UPDATE feedback
            SET status = %s, reply = %s
            WHERE feedback_id = %s
        """, (status, reply, feedback_id))

        conn.commit()

        if cursor.rowcount == 0:
            return jsonify({"error": "Feedback not found"}), 404

        return jsonify({"message": "Feedback updated successfully"}), 200

    except Exception as e:
        print("❌ Feedback update error:", e)
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor: cursor.close()
        if conn: conn.close()
