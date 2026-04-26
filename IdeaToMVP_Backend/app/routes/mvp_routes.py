from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.idea import Idea
from app.models.mvp_plan import MVPPlan
from app.services.gemini_service import generate_mvp_plan
from app.utils.validators import validate_idea_input, sanitize_input

mvp_bp = Blueprint('mvp', __name__)

@mvp_bp.route('/generate', methods=['POST'])
@jwt_required()
def generate_mvp():
    """
    POST /api/mvp/generate
    Headers: Authorization: Bearer <token>
    Body: { idea_description, target_users, category }
    Calls Gemini API and stores the generated plan
    """
    user_id = int(get_jwt_identity())
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No input data provided.'}), 400

    errors = validate_idea_input(data)
    if errors:
        return jsonify({'errors': errors}), 422

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
    db.session.flush()

    plan, error = generate_mvp_plan(idea_description, target_users, category)

    if error:
        db.session.rollback()
        return jsonify({'error': error}), 502

    mvp_plan = MVPPlan(
        user_id=user_id,
        idea_id=idea.id,
        idea_text=idea_description,
        plan_json=plan
    )
    db.session.add(mvp_plan)
    db.session.commit()

    return jsonify({
        'message': 'MVP plan generated successfully.',
        'plan_id': mvp_plan.id,
        'plan': mvp_plan.to_dict()
    }), 201


@mvp_bp.route('/my-plans', methods=['GET'])
@jwt_required()
def get_my_plans():
    """
    GET /api/mvp/my-plans
    Returns all saved MVP plans for the logged-in user
    """
    user_id = int(get_jwt_identity())
    plans = MVPPlan.query.filter_by(user_id=user_id).order_by(MVPPlan.created_at.desc()).all()

    return jsonify({
        'plans': [plan.to_dict() for plan in plans]
    }), 200


@mvp_bp.route('/plan/<int:plan_id>', methods=['GET'])
@jwt_required()
def get_plan_by_id(plan_id):
    """
    GET /api/mvp/plan/<plan_id>
    Returns a single MVP plan by ID (only if it belongs to the user)
    """
    user_id = int(get_jwt_identity())
    plan = MVPPlan.query.filter_by(id=plan_id, user_id=user_id).first()

    if not plan:
        return jsonify({'error': 'Plan not found.'}), 404

    return jsonify({'plan': plan.to_dict()}), 200
