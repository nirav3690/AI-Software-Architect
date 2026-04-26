from app import db
from datetime import datetime
import bcrypt
# Database Models — Monar Dudhat Vipulbhai (202512019)
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    registration_date = db.Column(db.DateTime, default=datetime.utcnow)

    ideas = db.relationship('Idea', backref='user', lazy=True)
    mvp_plans = db.relationship('MVPPlan', backref='user', lazy=True)

    def set_password(self, password):
        salt = bcrypt.gensalt(rounds=12)
        self.hashed_password = bcrypt.hashpw(
            password.encode('utf-8'), salt
        ).decode('utf-8')

    def check_password(self, password):
        return bcrypt.checkpw(
            password.encode('utf-8'),
            self.hashed_password.encode('utf-8')
        )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'registration_date': self.registration_date.isoformat()
        }