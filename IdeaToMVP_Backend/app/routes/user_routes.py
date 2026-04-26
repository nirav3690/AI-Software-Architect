from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.user import User
from app.models.idea import Idea
from app.models.mvp_plan import MVPPlan
from app.utils.validators import sanitize_input
import bcrypt

user_bp = Blueprint('user', __name__)


@user_bp.route('/me', methods=['GET'])
@jwt_required()
def get_profile():
    """
    GET /api/user/me
    Returns logged-in user's profile and account stats
    """
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found.'}), 404

    total_ideas = Idea.query.filter_by(user_id=user_id).count()
    total_plans = MVPPlan.query.filter_by(user_id=user_id).count()

    return jsonify({
        'user': user.to_dict(),
        'stats': {
            'total_ideas': total_ideas,
            'total_plans': total_plans,
        }
    }), 200


@user_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """
    PUT /api/user/profile
    Body: { name }
    Updates user's display name
    """
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found.'}), 404

    data = request.get_json()
    if not data:
        return jsonify({'error': 'No input data provided.'}), 400

    name = sanitize_input(data.get('name', '').strip())
    if not name or len(name) < 2:
        return jsonify({'error': 'Name must be at least 2 characters.'}), 422
    if len(name) > 100:
        return jsonify({'error': 'Name must not exceed 100 characters.'}), 422

    user.name = name
    db.session.commit()

    return jsonify({
        'message': 'Profile updated successfully.',
        'user': user.to_dict()
    }), 200


@user_bp.route('/change-password', methods=['PUT'])
@jwt_required()
def change_password():
    """
    PUT /api/user/change-password
    Body: { current_password, new_password }
    """
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found.'}), 404

    data = request.get_json()
    if not data:
        return jsonify({'error': 'No input data provided.'}), 400

    current_password = data.get('current_password', '')
    new_password = data.get('new_password', '')

    if not current_password or not new_password:
        return jsonify({'error': 'Both current and new password are required.'}), 400

    if not user.check_password(current_password):
        return jsonify({'error': 'Current password is incorrect.'}), 401

    if len(new_password) < 8:
        return jsonify({'error': 'New password must be at least 8 characters.'}), 422

    user.set_password(new_password)
    db.session.commit()

    return jsonify({'message': 'Password changed successfully.'}), 200


@user_bp.route('/delete-account', methods=['DELETE'])
@jwt_required()
def delete_account():
    """
    DELETE /api/user/delete-account
    Body: { password }
    Permanently deletes user account and all related data
    """
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found.'}), 404

    data = request.get_json()
    if not data:
        return jsonify({'error': 'Password confirmation required.'}), 400

    password = data.get('password', '')
    if not user.check_password(password):
        return jsonify({'error': 'Password is incorrect.'}), 401

    MVPPlan.query.filter_by(user_id=user_id).delete()
    Idea.query.filter_by(user_id=user_id).delete()
    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'Account deleted successfully.'}), 200
