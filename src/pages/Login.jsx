import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const css = `
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: linear-gradient(160deg, #fff 0%, #f0eeff 100%);
  position: relative;
  overflow: hidden;
}
.auth-blob1 {
  position: absolute; width: 500px; height: 500px; border-radius: 50%;
  background: radial-gradient(circle, rgba(255,107,107,0.15), transparent 70%);
  top: -100px; left: -100px; pointer-events: none;
  animation: float 8s ease-in-out infinite;
}
.auth-blob2 {
  position: absolute; width: 400px; height: 400px; border-radius: 50%;
  background: radial-gradient(circle, rgba(91,95,239,0.12), transparent 70%);
  bottom: -80px; right: -80px; pointer-events: none;
  animation: float 10s ease-in-out infinite reverse;
}

.auth-container {
  position: relative; z-index: 2;
  display: grid; grid-template-columns: 1fr 1fr; gap: 0;
  max-width: 900px; width: 100%; background: #fff;
  border-radius: 24px; overflow: hidden;
  box-shadow: 0 20px 60px rgba(91,95,239,0.15);
}

/* LEFT SIDE - FORM */
.auth-form-side {
  padding: 48px 40px;
}
.auth-logo {
  display: flex; align-items: center; gap: 8px;
  font-weight: 800; font-size: 18px; margin-bottom: 8px;
  text-decoration: none; color: var(--text);
}
.auth-logo-icon {
  width: 32px; height: 32px; border-radius: 9px;
  background: linear-gradient(135deg, var(--coral), var(--indigo));
  display: flex; align-items: center; justify-content: center;
  font-size: 15px;
}
.auth-back {
  font-size: 12px; color: var(--soft); margin-bottom: 32px;
  text-decoration: none; display: inline-flex; align-items: center; gap: 4px;
}
.auth-back:hover { color: var(--indigo); }

.auth-title { font-weight: 800; font-size: 28px; margin-bottom: 8px; letter-spacing: -0.5px; }
.auth-sub { font-size: 14px; color: var(--soft); margin-bottom: 32px; }

.auth-form { display: flex; flex-direction: column; gap: 18px; }
.auth-fg { display: flex; flex-direction: column; gap: 6px; }
.auth-label { font-size: 13px; font-weight: 600; }
.auth-input {
  font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px;
  padding: 12px 16px; border: 1.5px solid var(--border);
  border-radius: 10px; background: var(--bg); color: var(--text);
  outline: none; transition: border-color .2s, box-shadow .2s;
}
.auth-input:focus {
  border-color: var(--indigo);
  box-shadow: 0 0 0 3px rgba(91,95,239,0.12);
}

.auth-options {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 13px; margin-top: -6px;
}
.auth-checkbox {
  display: flex; align-items: center; gap: 8px; color: var(--soft);
}
.auth-checkbox input { cursor: pointer; }
.auth-link {
  color: var(--indigo); text-decoration: none; font-weight: 600;
}
.auth-link:hover { text-decoration: underline; }

.auth-submit {
  width: 100%; margin-top: 6px;
  background: linear-gradient(135deg, var(--indigo), var(--coral));
  color: #fff; border: none; padding: 14px;
  border-radius: 10px; font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700; font-size: 15px; cursor: pointer;
  box-shadow: 0 6px 20px rgba(91,95,239,0.3);
  transition: transform .15s, box-shadow .15s;
}
.auth-submit:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(91,95,239,0.4); }
.auth-submit:disabled { opacity: 0.7; cursor: not-allowed; }

.auth-divider {
  display: flex; align-items: center; gap: 12px;
  margin: 20px 0; color: var(--soft); font-size: 12px; font-weight: 600;
}
.auth-divider::before, .auth-divider::after {
  content: ''; flex: 1; height: 1px; background: var(--border);
}

.auth-social { display: flex; gap: 10px; }
.social-btn {
  flex: 1; padding: 11px; border: 1.5px solid var(--border);
  border-radius: 10px; background: #fff; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  font-size: 13px; font-weight: 600; color: var(--text);
  transition: border-color .2s, transform .15s;
}
.social-btn:hover { border-color: var(--indigo); transform: translateY(-2px); }
.social-icon { width: 18px; height: 18px; }

.auth-footer {
  text-align: center; margin-top: 24px; font-size: 13px; color: var(--soft);
}
.auth-footer a { color: var(--indigo); font-weight: 600; text-decoration: none; }
.auth-footer a:hover { text-decoration: underline; }

/* RIGHT SIDE - VISUAL */
.auth-visual-side {
  background: linear-gradient(135deg, var(--indigo), var(--coral));
  padding: 48px 40px; display: flex; flex-direction: column;
  justify-content: center; align-items: center;
  text-align: center; color: #fff; position: relative;
  overflow: hidden;
}
.auth-visual-bg {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
  background-size: 30px 30px;
}
.auth-visual-content { position: relative; z-index: 2; }
.auth-visual-icon {
  width: 80px; height: 80px; border-radius: 20px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center;
  font-size: 36px; margin: 0 auto 24px;
  border: 1px solid rgba(255,255,255,0.2);
}
.auth-visual-title {
  font-family: 'Instrument Serif', serif;
  font-size: 32px; font-weight: 400; font-style: italic;
  letter-spacing: -1px; margin-bottom: 12px; line-height: 1.2;
}
.auth-visual-desc {
  font-size: 14px; opacity: 0.85; line-height: 1.7; max-width: 300px;
  margin: 0 auto 28px;
}
.auth-visual-stats {
  display: flex; gap: 24px; justify-content: center;
  padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.2);
}
.stat-item { text-align: center; }
.stat-num {
  font-weight: 800; font-size: 24px; letter-spacing: -1px;
  margin-bottom: 4px;
}
.stat-label { font-size: 11px; opacity: 0.7; text-transform: uppercase; letter-spacing: 1px; }

.error-msg {
  font-size: 13px; color: var(--coral);
  background: rgba(255,107,107,0.08);
  padding: 10px 14px; border-radius: 8px;
  border: 1px solid rgba(255,107,107,0.2);
  display: flex; align-items: center; gap: 8px;
}

@media (max-width: 768px) {
  .auth-container { grid-template-columns: 1fr; }
  .auth-visual-side { padding: 32px 24px; }
}
`;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Set authentication
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);
      // Navigate to home after successful login
      window.location.href = "/";
    }, 1500);
  };

  return (
    <>
      <style>{css}</style>
      <div className="auth-page">
        <div className="auth-blob1" />
        <div className="auth-blob2" />

        <div className="auth-container">
          {/* LEFT - FORM */}
          <div className="auth-form-side">
            <Link to="/" className="auth-logo">
              <div className="auth-logo-icon">🚀</div>
              IdeaToMVP
            </Link>
            <Link to="/" className="auth-back">← Back to home</Link>

            <h1 className="auth-title">Welcome back!</h1>
            <p className="auth-sub">Log in to your account to continue generating MVP plans.</p>

            {error && (
              <div className="error-msg">
                <span>⚠️</span> {error}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-fg">
                <label className="auth-label">Email Address</label>
                <input
                  type="email"
                  className="auth-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="auth-fg">
                <label className="auth-label">Password</label>
                <input
                  type="password"
                  className="auth-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="auth-options">
                <label className="auth-checkbox">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Remember me
                </label>
                <a href="#" className="auth-link">Forgot password?</a>
              </div>

              <button className="auth-submit" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Log In →"}
              </button>
            </form>

            <div className="auth-divider">or continue with</div>

            <div className="auth-social">
              <button className="social-btn">
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="social-btn">
                <svg className="social-icon" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

            <div className="auth-footer">
              Don't have an account? <Link to="/register">Sign up</Link>
            </div>
          </div>

          {/* RIGHT - VISUAL */}
          <div className="auth-visual-side">
            <div className="auth-visual-bg" />
            <div className="auth-visual-content">
              <div className="auth-visual-icon">🚀</div>
              <h2 className="auth-visual-title">Start building your<br/>MVP today</h2>
              <p className="auth-visual-desc">
                Join thousands of founders who've turned their startup ideas into developer-ready plans in under 30 seconds.
              </p>
              <div className="auth-visual-stats">
                <div className="stat-item">
                  <div className="stat-num">2.4k+</div>
                  <div className="stat-label">Users</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">98%</div>
                  <div className="stat-label">Accuracy</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">&lt;30s</div>
                  <div className="stat-label">Gen Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
