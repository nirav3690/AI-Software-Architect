import re
import html

def sanitize_input(text):
    """Sanitize input to prevent XSS - strip HTML tags and escape special chars"""
    if not text:
        return text
    # Remove HTML tags
    clean = re.sub(r'<[^>]+>', '', str(text))
    # Escape remaining special characters
    clean = html.escape(clean)
    return clean.strip()

def validate_registration(data):
    """Validate user registration input"""
    errors = []

    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    password = data.get('password', '')

    if not name or len(name) < 2:
        errors.append("Name must be at least 2 characters.")
    if len(name) > 100:
        errors.append("Name must not exceed 100 characters.")

    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    if not email or not re.match(email_regex, email):
        errors.append("A valid email address is required.")

    if not password or len(password) < 8:
        errors.append("Password must be at least 8 characters.")

    return errors

def validate_idea_input(data):
    """Validate startup idea submission"""
    errors = []

    idea = data.get('idea_description', '').strip()
    category = data.get('category', '').strip()

    if not idea or len(idea) < 20:
        errors.append("Idea description must be at least 20 characters.")
    if len(idea) > 5000:
        errors.append("Idea description must not exceed 5000 characters.")
    if category and len(category) > 50:
        errors.append("Category must not exceed 50 characters.")

    return errors
