from app import db
from datetime import datetime

class Idea(db.Model):
    __tablename__ = 'ideas'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    idea_description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), nullable=True)
    target_users = db.Column(db.String(500), nullable=True)
    submission_timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship
    mvp_plans = db.relationship('MVPPlan', backref='idea', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'idea_description': self.idea_description,
            'category': self.category,
            'target_users': self.target_users,
            'submission_timestamp': self.submission_timestamp.isoformat()
        }
