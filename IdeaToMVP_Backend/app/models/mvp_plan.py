from app import db
from datetime import datetime

class MVPPlan(db.Model):
    __tablename__ = 'mvp_plans'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    idea_id = db.Column(db.Integer, db.ForeignKey('ideas.id'), nullable=False)
    idea_text = db.Column(db.Text, nullable=False)
    plan_json = db.Column(db.JSON, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'idea_id': self.idea_id,
            'idea_text': self.idea_text,
            'plan': self.plan_json,
            'created_at': self.created_at.isoformat()
        }
