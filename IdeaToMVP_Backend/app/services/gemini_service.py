import json
import re
import requests
from flask import current_app
# AI Prompt Engineering & Groq Integration — Achyut Pathak (202512039)

def build_mvp_prompt(idea_description, target_users, category):
    return f"""You are a senior software architect. Generate a PRECISE, SPECIFIC MVP plan for the idea below.

STARTUP IDEA: {idea_description}
TARGET USERS: {target_users or 'General users'}
INDUSTRY CATEGORY: {category or 'Tech / General'}

RULES:

FEATURES (8-10, specific to this idea):
- HIGH = app cannot function without this
- MEDIUM = important but launchable without it  
- LOW = post-MVP enhancement
- Social/discovery apps: search MUST be HIGH priority
- User-generated content: MUST include content reporting feature
- Each description: 1-2 sentences explaining HOW it works

TECH STACK (ONE technology per layer, no alternatives):
- Required: Frontend, Backend, Database, Authentication, Hosting
- Rationale must be specific to this idea

DATABASE SCHEMA (complete, matching all features):
- Every table: id UUID, created_at TIMESTAMP, updated_at TIMESTAMP
- Voting feature -> votes table with UNIQUE(user_id, target_id)
- Follow feature -> follows(follower_id, following_id)
- Notifications -> notifications(user_id, type, is_read, reference_id)
- All foreign keys: FOREIGN KEY REFERENCES table(id) ON DELETE CASCADE

ROADMAP (exactly 5 phases):
- Phase 1 (Week 1-2): System design only, no coding
- Phase 2 (Week 3-4): Core backend + auth + primary APIs
- Phase 3 (Week 5-6): Frontend + HIGH priority feature integration
- Phase 4 (Week 7-8): MEDIUM features + testing + bug fixes
- Phase 5 (Week 9-10): Deployment + CI/CD + UAT + soft launch
- 3-4 deliverables per phase, milestone must be testable

IMPLEMENTATION STEPS (6 stages, 3-4 steps each — be concise):
- Stage 1: Environment Setup (install commands)
- Stage 2: Database Setup (CREATE TABLE commands)
- Stage 3: Backend Implementation (API endpoints, order)
- Stage 4: Frontend Implementation (screens, order)
- Stage 5: Integration and Testing (connect + test)
- Stage 6: Deployment (deploy to chosen host)
- Keep each step description under 2 sentences
- Keep commands short and accurate
- Keep verify under 1 sentence

CRITICAL JSON RULES:
- Use double quotes only
- Escape any apostrophe in strings as \\'
- Do NOT use newlines inside string values — use a space instead
- Do NOT include trailing commas
- Respond with ONLY the JSON object, nothing else

{{
  "features": [
    {{"name": "string", "description": "string", "priority": "High"}}
  ],
  "tech_stack": [
    {{"category": "string", "technologies": ["string"], "rationale": "string"}}
  ],
  "database_schema": [
    {{
      "table": "string",
      "columns": [
        {{"name": "id", "type": "UUID", "constraints": "PRIMARY KEY DEFAULT gen_random_uuid()"}},
        {{"name": "created_at", "type": "TIMESTAMP", "constraints": "NOT NULL DEFAULT NOW()"}},
        {{"name": "updated_at", "type": "TIMESTAMP", "constraints": "NOT NULL DEFAULT NOW()"}}
      ]
    }}
  ],
  "roadmap": [
    {{
      "phase": "Phase 1 - Week 1-2: System Design",
      "deliverables": ["string", "string", "string"],
      "milestone": "string"
    }}
  ],
  "implementation_steps": [
    {{
      "stage": "Stage 1 - Environment Setup",
      "steps": [
        {{
          "step_number": 1,
          "title": "string",
          "description": "string",
          "commands": ["string"],
          "verify": "string"
        }}
      ]
    }}
  ]
}}"""


def clean_json_string(raw: str) -> str:
    """
    Attempt to clean common AI JSON issues before parsing.
    """
    # Strip markdown fences
    raw = re.sub(r'^```json\s*', '', raw.strip())
    raw = re.sub(r'^```\s*', '', raw)
    raw = re.sub(r'\s*```$', '', raw)
    raw = raw.strip()

    # Remove trailing commas before ] or }
    raw = re.sub(r',\s*([}\]])', r'\1', raw)

    # Remove any null bytes
    raw = raw.replace('\x00', '')

    return raw


def attempt_partial_recovery(raw: str) -> dict | None:
    """
    If the JSON is truncated, try to find the last complete top-level key
    and close the JSON manually.
    """
    try:
        # Try closing with }]} patterns to recover truncated JSON
        attempts = [
            raw + ']}]}',
            raw + ']}',
            raw + '}]}',
            raw + '}}]}',
            raw + '"}]}',
            raw + '"]}}]}',
        ]
        for attempt in attempts:
            cleaned = re.sub(r',\s*([}\]])', r'\1', attempt)
            try:
                return json.loads(cleaned)
            except json.JSONDecodeError:
                continue
    except Exception:
        pass
    return None


def call_groq(api_key: str, prompt: str, temperature: float = 0.4, max_tokens: int = 8192) -> str:
    response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        },
        json={
            "model": "llama-3.3-70b-versatile",
            "messages": [
                {
                    "role": "system",
                    "content": (
                        "You are a senior software architect. "
                        "You respond ONLY with a valid JSON object. "
                        "Never include markdown, explanations, or text outside the JSON. "
                        "Never use unescaped apostrophes inside JSON strings. "
                        "Never add trailing commas. "
                        "Keep all string values on a single line with no newlines inside them."
                    )
                },
                {"role": "user", "content": prompt}
            ],
            "temperature": temperature,
            "max_tokens": max_tokens
        },
        timeout=60
    )
    return response.json()["choices"][0]["message"]["content"].strip()


def generate_mvp_plan(idea_description, target_users, category):
    try:
        api_key = current_app.config.get('GROQ_API_KEY')
        if not api_key:
            return None, "Groq API key not configured."

        prompt = build_mvp_prompt(idea_description, target_users, category)

        # ── Attempt 1: Full prompt ────────────────────────────────────────────
        raw_text = call_groq(api_key, prompt, temperature=0.4, max_tokens=8192)
        cleaned  = clean_json_string(raw_text)

        try:
            plan = json.loads(cleaned)
            return plan, None
        except json.JSONDecodeError:
            pass

        # ── Attempt 2: Try partial recovery (truncated response) ──────────────
        recovered = attempt_partial_recovery(cleaned)
        if recovered and isinstance(recovered, dict) and 'features' in recovered:
            return recovered, None

        # ── Attempt 3: Lower temperature, retry ───────────────────────────────
        raw_text2 = call_groq(api_key, prompt, temperature=0.2, max_tokens=8192)
        cleaned2  = clean_json_string(raw_text2)

        try:
            plan = json.loads(cleaned2)
            return plan, None
        except json.JSONDecodeError:
            pass

        # ── Attempt 4: Minimal prompt without implementation_steps ────────────
        minimal_prompt = build_mvp_prompt(idea_description, target_users, category).replace(
            "IMPLEMENTATION STEPS", "SKIP_IMPL"
        ) + "\n\nNOTE: Omit the implementation_steps key entirely. Return only features, tech_stack, database_schema, and roadmap."

        raw_text3 = call_groq(api_key, minimal_prompt, temperature=0.2, max_tokens=4096)
        cleaned3  = clean_json_string(raw_text3)

        try:
            plan = json.loads(cleaned3)
            return plan, None
        except json.JSONDecodeError as e:
            return None, f"Failed to parse AI response as JSON after 4 attempts: {str(e)}"

    except Exception as e:
        return None, f"Groq API error: {str(e)}"