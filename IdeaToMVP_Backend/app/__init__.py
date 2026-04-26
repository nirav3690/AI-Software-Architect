from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config.config import Config

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)

    # Allow React frontend on port 3000 to call the backend
    CORS(app, resources={r"/api/*": {"origins": [
    "http://localhost:3000",
    "https://ai-software-architect.vercel.app"
]}})

    # Register Blueprints
    from app.routes.auth_routes import auth_bp
    from app.routes.idea_routes import idea_bp
    from app.routes.mvp_routes import mvp_bp
    from app.routes.user_routes import user_bp   # NEW: user profile & dashboard
    from app.routes.pdf_routes import pdf_bp     # NEW: PDF export

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(idea_bp, url_prefix='/api/idea')
    app.register_blueprint(mvp_bp, url_prefix='/api/mvp')
    app.register_blueprint(user_bp, url_prefix='/api/user')   # NEW
    app.register_blueprint(pdf_bp, url_prefix='/api/pdf')     # NEW

    with app.app_context():
        db.create_all()

    return app
