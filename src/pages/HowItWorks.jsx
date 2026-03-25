import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const css = `
.hiw-hero {
  background: linear-gradient(160deg, #fff 0%, #f0eeff 100%);
  padding: 80px 56px 64px; text-align: center;
  border-bottom: 1px solid var(--border);
}
.hiw-hero .section-title { margin-bottom: 14px; }
.hiw-hero .section-sub { max-width: 500px; margin: 0 auto 36px; }

/* connector steps */
.steps-section { padding: 80px 56px; }
.steps-wrapper { display: flex; flex-direction: column; gap: 0; max-width: 860px; margin: 0 auto; }

.step-row {
  display: grid; grid-template-columns: 80px 1fr; gap: 32px;
  position: relative;
}
.step-left {
  display: flex; flex-direction: column; align-items: center; gap: 0;
}
.step-circle {
  width: 64px; height: 64px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 26px; font-weight: 800; z-index: 2; position: relative;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}
.sc1 { background: linear-gradient(135deg, #FFE5E5, #FFCACA); color: var(--coral); }
.sc2 { background: linear-gradient(135deg, #D5FFF5, #B8FFF0); color: var(--teal); }
.sc3 { background: linear-gradient(135deg, #E5E7FF, #D0D3FF); color: var(--indigo); }
.step-line {
  width: 2px; flex: 1; min-height: 48px;
  background: linear-gradient(180deg, var(--border), transparent);
  margin: 4px 0;
}
.step-content {
  background: #fff; border: 1.5px solid var(--border); border-radius: 20px;
  padding: 32px 36px; margin-bottom: 24px;
  transition: box-shadow .2s, transform .2s;
}
.step-content:hover { box-shadow: 0 12px 36px rgba(91,95,239,0.1); transform: translateX(4px); }
.step-num { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--soft); margin-bottom: 8px; }
.step-title { font-weight: 800; font-size: 22px; margin-bottom: 10px; }
.step-desc { font-size: 15px; color: var(--soft); line-height: 1.7; margin-bottom: 18px; }
.step-details { display: flex; flex-wrap: wrap; gap: 10px; }
.step-tag {
  font-size: 12px; font-weight: 600; padding: 5px 14px; border-radius: 100px;
  background: var(--bg); border: 1.5px solid var(--border); color: var(--soft);
}

/* workflow table */
.workflow-section { padding: 0 56px 80px; }
.workflow-title { font-weight: 800; font-size: 26px; letter-spacing: -0.5px; margin-bottom: 28px; }
.workflow-table { width: 100%; border-collapse: collapse; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(91,95,239,0.08); }
.workflow-table th {
  background: var(--indigo); color: #fff;
  padding: 14px 20px; text-align: left; font-size: 13px; font-weight: 700; letter-spacing: 0.5px;
}
.workflow-table td {
  padding: 14px 20px; font-size: 14px; border-bottom: 1px solid var(--border);
  background: #fff;
}
.workflow-table tr:last-child td { border-bottom: none; }
.workflow-table tr:hover td { background: var(--bg); }
.wf-num {
  width: 28px; height: 28px; border-radius: 8px; display: inline-flex;
  align-items: center; justify-content: center; font-size: 12px; font-weight: 800; color: #fff;
}

/* CTA strip */
.hiw-cta {
  background: linear-gradient(135deg, var(--coral), var(--indigo));
  margin: 0 56px 80px; border-radius: 24px; padding: 56px 48px;
  display: flex; align-items: center; justify-content: space-between; gap: 32px;
  color: #fff;
}
.hiw-cta-title { font-weight: 800; font-size: 28px; letter-spacing: -1px; margin-bottom: 8px; }
.hiw-cta-sub { font-size: 15px; opacity: 0.8; }
.btn-white {
  background: #fff; color: var(--indigo);
  border: none; padding: 14px 28px; border-radius: 100px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700; font-size: 15px; cursor: pointer; white-space: nowrap;
  transition: transform .15s, box-shadow .15s; flex-shrink: 0;
  text-decoration: none;
}
.btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
`;

const steps = [
  {
    sc: "sc1", icon: "💡", num: "Step 01",
    title: "Submit Your Startup Idea",
    desc: "Type your concept in plain English — no technical background needed. Just tell us what problem you're solving, who your users are, and what your app should do.",
    tags: ["Natural language input","Any industry","No tech skills needed","Takes under 60 seconds"],
  },
  {
    sc: "sc2", icon: "🤖", num: "Step 02",
    title: "AI Analyzes & Generates Your Plan",
    desc: "Our Gemini-powered backend processes your idea and generates a complete, structured MVP plan — features, tech stack, database schema, and a week-by-week roadmap.",
    tags: ["Gemini AI","Flask backend","Structured JSON output","Under 30 seconds"],
  },
  {
    sc: "sc3", icon: "📄", num: "Step 03",
    title: "Download & Use Your Blueprint",
    desc: "Your full MVP plan is displayed on screen and saved to your dashboard. Export it as a polished PDF to share with developers, investors, or your team.",
    tags: ["PDF export","Saved to dashboard","Developer-ready","Share anywhere"],
  },
];

const workflow = [
  { step:"1", layer:"Frontend (React.js)", action:"User fills in idea submission form", color:"#FF6B6B" },
  { step:"2", layer:"Backend (Flask)",     action:"Request received, AI prompt is prepared", color:"#FFB347" },
  { step:"3", layer:"AI Layer (Gemini)",   action:"LLM generates structured MVP details", color:"#00C9A7" },
  { step:"4", layer:"Backend (Flask)",     action:"AI output is processed and formatted", color:"#38BDF8" },
  { step:"5", layer:"Database (PostgreSQL)", action:"Results are stored for the user", color:"#5B5FEF" },
  { step:"6", layer:"Frontend (React.js)", action:"MVP plan displayed & PDF export offered", color:"#FF8FAB" },
];

export default function HowItWorks() {
  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="page">

        {/* HERO */}
        <div className="hiw-hero">
          <div className="section-chip">Process</div>
          <h1 className="section-title fade-up">How IdeaToMVP Works</h1>
          <p className="section-sub fade-up delay-1">
            From startup idea to developer-ready blueprint in 3 simple steps. No technical expertise required — just describe your vision.
          </p>
          <div className="fade-up delay-2">
            <Link to="/demo" className="btn-coral">Try it yourself →</Link>
          </div>
        </div>

        {/* STEPS */}
        <section className="steps-section">
          <div className="steps-wrapper">
            {steps.map((s, i) => (
              <div key={i} className="step-row fade-up" style={{animationDelay:`${i*0.15}s`}}>
                <div className="step-left">
                  <div className={`step-circle ${s.sc}`}>{s.icon}</div>
                  {i < steps.length - 1 && <div className="step-line" />}
                </div>
                <div className="step-content">
                  <div className="step-num">{s.num}</div>
                  <div className="step-title">{s.title}</div>
                  <div className="step-desc">{s.desc}</div>
                  <div className="step-details">
                    {s.tags.map(t => <span key={t} className="step-tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WORKFLOW TABLE */}
        <section className="workflow-section">
          <h2 className="workflow-title">⚙️ Under the hood — full workflow</h2>
          <table className="workflow-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Layer</th>
                <th>What Happens</th>
              </tr>
            </thead>
            <tbody>
              {workflow.map(w => (
                <tr key={w.step}>
                  <td><span className="wf-num" style={{background:w.color}}>{w.step}</span></td>
                  <td style={{fontWeight:600}}>{w.layer}</td>
                  <td style={{color:"var(--soft)"}}>{w.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* CTA */}
        <div className="hiw-cta fade-up">
          <div>
            <div className="hiw-cta-title">Ready to generate your blueprint?</div>
            <div className="hiw-cta-sub">Submit your idea and get a full MVP plan in under 30 seconds.</div>
          </div>
          <Link to="/demo" className="btn-white">Generate My Plan →</Link>
        </div>

        <Footer />
      </div>
    </>
  );
}
