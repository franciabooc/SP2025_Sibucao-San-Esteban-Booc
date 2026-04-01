from flask import Blueprint, request, jsonify
from db import get_connection

# IMPORTANT: no trailing slash redirect
login_bp = Blueprint('login', __name__)

@login_bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    # Handle CORS preflight
    if request.method == 'OPTIONS':
        return jsonify({"message": "OK"}), 200

    try:
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({
                "success": False,
                "message": "Email and password required"
            }), 400

        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
            SELECT admin_id, f_name, m_name, l_name, email_acc
            FROM admin_gbm
            WHERE email_acc = %s AND password = %s
        """
        cursor.execute(query, (email, password))
        admin = cursor.fetchone()

        cursor.close()
        conn.close()

        if admin:
            return jsonify({
                "success": True,
                "admin": admin
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": "Invalid email or password"
            }), 401

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
