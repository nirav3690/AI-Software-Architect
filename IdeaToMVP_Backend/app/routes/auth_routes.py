from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app import db
from app.models.user import User
from app.utils.validators import validate_registration, sanitize_input

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """
    POST /api/auth/register
    Body: { name, email, password }
    """
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No input data provided.'}), 400

    # Validate input
    errors = validate_registration(data)
    if errors:
        return jsonify({'errors': errors}), 422

    # Sanitize
    name = sanitize_input(data['name'])
    email = sanitize_input(data['email'].lower())

    # Check if email already exists
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'An account with this email already exists.'}), 409

    # Create user
    user = User(name=name, email=email)
    user.set_password(data['password'])

    db.session.add(user)
    db.session.commit()

    # Generate JWT token
    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        'message': 'Account created successfully.',
        'user': user.to_dict(),
        'access_token': access_token
    }), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    """
    POST /api/auth/login
    Body: { email, password }
    """
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No input data provided.'}), 400

    email = sanitize_input(data.get('email', '').lower())
    password = data.get('password', '')

    if not email or not password:
        return jsonify({'error': 'Email and password are required.'}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid email or password.'}), 401

    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        'message': 'Login successful.',
        'user': user.to_dict(),
        'access_token': access_token
    }), 200
