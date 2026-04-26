from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.idea import Idea
from app.utils.validators import validate_idea_input, sanitize_input

idea_bp = Blueprint('idea', __name__)

@idea_bp.route('/submit', methods=['POST'])
@jwt_required()
def submit_idea():
    """
    POST /api/idea/submit
    Headers: Authorization: Bearer <token>
    Body: { idea_description, target_users, category }
    """
    user_id = int(get_jwt_identity())
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No input data provided.'}), 400

    # Validate
    errors = validate_idea_input(data)
    if errors:
        return jsonify({'errors': errors}), 422

    # Sanitize
    idea_description = sanitize_input(data['idea_description'])
    target_users     = sanitize_input(data.get('target_users', ''))
    category         = sanitize_input(data.get('category', ''))

    idea = Idea(
        user_id=user_id,
        idea_description=idea_description,
        target_users=target_users,
        category=category
    )

    db.session.add(idea)
    db.session.commit()

    return jsonify({
        'message': 'Idea submitted successfully.',
        'idea': idea.to_dict()
    }), 201


@idea_bp.route('/my-ideas', methods=['GET'])
@jwt_required()
def get_my_ideas():
    """
    GET /api/idea/my-ideas
    Returns all ideas submitted by the logged-in user
    """
    user_id = int(get_jwt_identity())
    ideas = Idea.query.filter_by(user_id=user_id).order_by(Idea.submission_timestamp.desc()).all()

    return jsonify({
        'ideas': [idea.to_dict() for idea in ideas]
    }), 200
