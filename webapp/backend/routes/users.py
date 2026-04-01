# /backend/routes/users.py
from flask import Blueprint, jsonify
from db import get_connection

users_bp = Blueprint('users', __name__)

@users_bp.route('/users', methods=['GET'])
def get_users():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT 
                user_id AS id,
                f_name AS firstName,
                m_name AS middleName,
                l_name AS lastName,
                email_acc AS email,
                password
            FROM app_user
        """)
        users = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(users)
    except Exception as e:
        print("❌ Error fetching users:", e)
        return jsonify({"error": str(e)}), 500
