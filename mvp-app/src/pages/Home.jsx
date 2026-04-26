import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const css = `
/* ── HOME PAGE ── */
.home-hero {
  min-height: calc(100vh - 68px);
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 60px; align-items: center;
  padding: 80px 56px 80px;
  position: relative; overflow: hidden;
}
.blob1 {
  position: absolute; width: 560px; height: 560px; border-radius: 50%;
  background: radial-gradient(circle, rgba(255,107,107,0.18), transparent 70%);
  top: -80px; left: -80px; pointer-events: none;
  animation: float 8s ease-in-out infinite;
}
.blob2 {
  position: absolute; width: 480px; height: 480px; border-radius: 50%;
  background: radial-gradient(circle, rgba(91,95,239,0.15), transparent 70%);
  bottom: -60px; right: 0; pointer-events: none;
  animation: float 10s ease-in-out infinite reverse;
}
.hero-left { position: relative; z-index: 2; }
.hero-pill {
  display: inline-flex; align-items: center; gap: 8px;
  background: #fff; border: 1.5px solid var(--border);
  padding: 6px 16px; border-radius: 100px;
  font-size: 13px; font-weight: 600; color: var(--indigo);
  margin-bottom: 28px; box-shadow: 0 2px 10px rgba(91,95,239,0.12);
}
.pill-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--teal); animation: pulse 2s infinite;
}
.hero-title {
  font-size: clamp(40px, 4.5vw, 66px);
  font-weight: 800; line-height: 1.08;
  letter-spacing: -2px; margin-bottom: 22px;
}
.hero-title em {
  font-family: 'Instrument Serif', serif;
  font-style: italic; font-weight: 400;
  background: linear-gradient(135deg, var(--coral), var(--indigo));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-sub {
  font-size: 17px; color: var(--soft); line-height: 1.75;
  max-width: 440px; margin-bottom: 36px;
}
.hero-btns { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; }
.hero-social {
  display: flex; align-items: center; gap: 14px; margin-top: 40px;
  padding-top: 28px; border-top: 1px solid var(--border);
}
.avatars { display: flex; }
.av {
  width: 36px; height: 36px; border-radius: 50%;
  border: 2.5px solid #fff; margin-left: -10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 15px;
}
.av:first-child { margin-left: 0; }
.av1 { background: linear-gradient(135deg, var(--amber), var(--coral)); }
.av2 { background: linear-gradient(135deg, var(--teal), var(--sky)); }
.av3 { background: linear-gradient(135deg, var(--pink), var(--indigo)); }
.social-text { font-size: 13px; color: var(--soft); }
.social-text strong { color: var(--text); }

/* card stack */
.hero-right { position: relative; z-index: 2; display: flex; justify-content: center; align-items: center; }
.card-stack { position: relative; width: 360px; height: 430px; }
.main-card {
  position: absolute; top: 0; left: 0; width: 100%;
  background: #fff; border-radius: 24px; padding: 28px;
  box-shadow: 0 20px 60px rgba(91,95,239,0.15), 0 4px 16px rgba(0,0,0,0.06);
  z-index: 3;
}
.card-back1 {
  position: absolute; top: 14px; left: -16px;
  width: 100%; height: 100%;
  background: linear-gradient(135deg, #FFE8E8, #FFF0F0);
  border-radius: 24px; z-index: 1; transform: rotate(-4deg);
}
.card-back2 {
  position: absolute; top: 10px; right: -16px;
  width: 100%; height: 100%;
  background: linear-gradient(135deg, #E8EAFF, #F0F1FF);
  border-radius: 24px; z-index: 2; transform: rotate(3deg);
}
.card-header {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px;
}
.card-logo { font-weight: 800; font-size: 15px; color: var(--indigo); }
.card-status {
  display: flex; align-items: center; gap: 6px;
  font-size: 11px; font-weight: 700; color: var(--teal);
  background: rgba(0,201,167,0.1); padding: 4px 10px; border-radius: 100px;
}
.card-idea-box {
  background: var(--bg); border-radius: 12px; padding: 14px;
  font-size: 13px; line-height: 1.5; margin-bottom: 18px;
  border: 1px solid var(--border);
}
.card-idea-label { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--soft); margin-bottom: 5px; }
.feature-row {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 0; border-bottom: 1px solid var(--border);
  font-size: 13px; font-weight: 500;
}
.feature-row:last-of-type { border-bottom: none; }
.fcheck {
  width: 20px; height: 20px; border-radius: 6px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; color: #fff;
}
.bg-coral  { background: var(--coral); }
.bg-teal   { background: var(--teal); }
.bg-indigo { background: var(--indigo); }
.bg-amber  { background: var(--amber); }
.bg-sky    { background: var(--sky); }
.stack-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }
.stag {
  font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 100px; border: 1.5px solid;
}
.t-coral  { color: var(--coral);  border-color: rgba(255,107,107,.3); background: rgba(255,107,107,.07); }
.t-teal   { color: var(--teal);   border-color: rgba(0,201,167,.3);   background: rgba(0,201,167,.07); }
.t-indigo { color: var(--indigo); border-color: rgba(91,95,239,.3);   background: rgba(91,95,239,.07); }
.t-amber  { color: #c47c00;       border-color: rgba(255,179,71,.4);  background: rgba(255,179,71,.1); }

.badge-float {
  position: absolute; background: #fff; border-radius: 14px; padding: 10px 14px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1); font-size: 12px; font-weight: 600;
  display: flex; align-items: center; gap: 8px; white-space: nowrap;
  animation: float 6s ease-in-out infinite; z-index: 10;
}
.b1 { top: 20px; right: -30px; animation-delay: 0s; }
.b2 { bottom: 90px; left: -45px; animation-delay: -3s; }
.b3 { bottom: 20px; right: -25px; animation-delay: -1.5s; }

/* stats bar */
.stats-bar {
  background: linear-gradient(135deg, var(--indigo), var(--coral));
  padding: 52px 56px; display: flex; justify-content: center; gap: 0;
}
.stat-block {
  flex: 1; max-width: 220px; text-align: center; color: #fff;
  border-right: 1px solid rgba(255,255,255,0.2); padding: 0 32px;
}
.stat-block:last-child { border-right: none; }
.stat-big {
  font-family: 'Instrument Serif', serif; font-style: italic;
  font-size: 48px; font-weight: 400; letter-spacing: -2px; line-height: 1;
}
.stat-desc { font-size: 14px; opacity: 0.8; margin-top: 6px; }

/* quick teaser cards row */
.teaser-section { padding: 80px 56px; }
.teaser-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 48px; }
.teaser-card {
  background: #fff; border: 1.5px solid var(--border); border-radius: 20px; padding: 32px;
  transition: transform .2s, box-shadow .2s; cursor: default;
}
.teaser-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(91,95,239,0.1); }
.teaser-icon { font-size: 32px; margin-bottom: 16px; }
.teaser-title { font-weight: 700; font-size: 18px; margin-bottom: 8px; }
.teaser-desc { font-size: 14px; color: var(--soft); line-height: 1.65; margin-bottom: 18px; }
.teaser-link {
  font-size: 13px; font-weight: 700; color: var(--indigo);
  text-decoration: none; display: inline-flex; align-items: center; gap: 4px;
}
.teaser-link:hover { text-decoration: underline; }
`;

export default function Home() {
  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="page">

        {/* HERO */}
        <section className="home-hero">
          <div className="blob1" /><div className="blob2" />

          <div className="hero-left">
            <div className="hero-pill fade-up">
              <span className="pill-dot" /> AI-Powered MVP Generator
            </div>
            <h1 className="hero-title fade-up delay-1">
              Turn any startup<br />
              idea into an <em>instant</em><br />
              MVP blueprint
            </h1>
            <p className="hero-sub fade-up delay-2">
              Stop spending weeks planning. Get AI-generated features, tech stack, database schema & a full roadmap for your startup — in under 30 seconds.
            </p>
            <div className="hero-btns fade-up delay-3">
              <Link to="/demo" className="btn-coral">Generate My MVP Plan →</Link>
              <Link to="/how-it-works" className="btn-outline">See how it works</Link>
            </div>
            <div className="hero-social fade-up delay-4">
              <div className="avatars">
                <div className="av av1">😊</div>
                <div className="av av2">🧑‍💻</div>
                <div className="av av3">👩‍🚀</div>
              </div>
              <div className="social-text">Trusted by <strong>2,400+ founders</strong> this semester</div>
            </div>
          </div>

          {/* Card Stack */}
          <div className="hero-right fade-up delay-2">
            <div className="card-stack">
              <div className="card-back1" /><div className="card-back2" />
              <div className="main-card">
                <div className="card-header">
                  <div className="card-logo">🚀 IdeaToMVP</div>
                  <div className="card-status"><span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />Generated</div>
                </div>
                <div className="card-idea-box">
                  <div className="card-idea-label">Your Idea</div>
                  "A skill-exchange marketplace for freelancers"
                </div>
                {[["bg-coral", "User Auth & Profiles"], ["bg-teal", "Skill Listing & Search"], ["bg-indigo", "In-app Messaging"], ["bg-amber", "Review & Ratings"], ["bg-sky", "Booking System"]].map(([bg, l]) => (
                  <div key={l} className="feature-row">
                    <div className={`fcheck ${bg}`}>✓</div>{l}
                  </div>
                ))}
                <div className="stack-row">
                  <span className="stag t-coral">React.js</span>
                  <span className="stag t-teal">Flask</span>
                  <span className="stag t-indigo">PostgreSQL</span>
                  <span className="stag t-amber">Gemini AI</span>
                </div>
              </div>
              <div className="badge-float b1"><span>⚡</span><span style={{ color: "var(--teal)", fontWeight: 700 }}>Ready in 28s</span></div>
              <div className="badge-float b2"><span>📄</span><span style={{ color: "var(--indigo)", fontWeight: 700 }}>PDF Export</span></div>
              <div className="badge-float b3"><span>🎯</span><span style={{ color: "var(--coral)", fontWeight: 700 }}>96% Accuracy</span></div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className="stats-bar">
          {[["< 30s", "Generation Time"], ["9", "Core Functionalities"], ["100%", "Free to Use"], ["AI", "Powered Architect"]].map(([n, l]) => (
            <div key={l} className="stat-block">
              <div className="stat-big">{n}</div>
              <div className="stat-desc">{l}</div>
            </div>
          ))}
        </div>

        {/* TEASERS */}
        <section className="teaser-section">
          <div style={{ textAlign: "center", marginBottom: 0 }}>
            <div className="section-chip">Explore the app</div>
            <h2 className="section-title">Everything you need<br />in one place</h2>
          </div>
          <div className="teaser-grid">
            {[
              { icon: "⚙️", title: "How it Works", desc: "Learn the 3-step process from idea to complete MVP plan in under 30 seconds.", link: "/how-it-works" },
              { icon: "✨", title: "Features", desc: "Explore all 9 AI-powered capabilities including schema design & roadmap generation.", link: "/features" },
              { icon: "🚀", title: "Try it Free", desc: "Submit your startup idea right now and get your full blueprint instantly.", link: "/demo" },
            ].map(t => (
              <div key={t.title} className="teaser-card">
                <div className="teaser-icon">{t.icon}</div>
                <div className="teaser-title">{t.title}</div>
                <div className="teaser-desc">{t.desc}</div>
                <Link to={t.link} className="teaser-link">Explore → </Link>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
