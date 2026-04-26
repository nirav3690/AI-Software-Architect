import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const css = `
.feat-hero {
  background: linear-gradient(160deg, #fff 0%, #f0eeff 100%);
  padding: 80px 56px 64px; text-align: center;
  border-bottom: 1px solid var(--border);
}
.feat-hero .section-sub { max-width: 520px; margin: 0 auto 36px; }

/* big grid */
.feat-section { padding: 80px 56px; }
.feat-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
}
.feat-card {
  background: #fff; border: 1.5px solid var(--border); border-radius: 20px; padding: 28px;
  transition: transform .2s, box-shadow .2s, border-color .2s; cursor: default;
  display: flex; flex-direction: column; gap: 14px;
}
.feat-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }
.feat-card:nth-child(1):hover { border-color: var(--coral); }
.feat-card:nth-child(2):hover { border-color: var(--teal); }
.feat-card:nth-child(3):hover { border-color: var(--indigo); }
.feat-card:nth-child(4):hover { border-color: var(--amber); }
.feat-card:nth-child(5):hover { border-color: var(--sky); }
.feat-card:nth-child(6):hover { border-color: var(--pink); }
.feat-card:nth-child(7):hover { border-color: var(--coral); }
.feat-card:nth-child(8):hover { border-color: var(--teal); }
.feat-card:nth-child(9):hover { border-color: var(--indigo); }

.feat-icon-wrap {
  width: 52px; height: 52px; border-radius: 16px;
  display: flex; align-items: center; justify-content: center; font-size: 24px;
}
.ic1 { background: rgba(255,107,107,0.12); }
.ic2 { background: rgba(0,201,167,0.12); }
.ic3 { background: rgba(91,95,239,0.12); }
.ic4 { background: rgba(255,179,71,0.15); }
.ic5 { background: rgba(56,189,248,0.12); }
.ic6 { background: rgba(255,143,171,0.12); }
.ic7 { background: rgba(255,107,107,0.12); }
.ic8 { background: rgba(0,201,167,0.12); }
.ic9 { background: rgba(91,95,239,0.12); }

.feat-num { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--soft); }
.feat-name { font-weight: 800; font-size: 17px; line-height: 1.3; }
.feat-info { font-size: 13px; color: var(--soft); line-height: 1.65; }
.feat-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.ftag {
  font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 100px;
  background: var(--bg); border: 1px solid var(--border); color: var(--soft);
}

/* tech section */
.tech-section { padding: 0 56px 80px; }
.tech-title { font-weight: 800; font-size: 26px; letter-spacing: -0.5px; margin-bottom: 32px; }
.tech-tiers { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
.tech-tier {
  background: #fff; border: 1.5px solid var(--border); border-radius: 20px; padding: 28px;
}
.tier-label {
  font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
  margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border);
}
.tier-label.tl-coral  { color: var(--coral); }
.tier-label.tl-teal   { color: var(--teal); }
.tier-label.tl-indigo { color: var(--indigo); }
.tech-item {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 0; border-bottom: 1px solid var(--border); font-size: 14px; font-weight: 500;
}
.tech-item:last-child { border-bottom: none; }
.tech-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

/* cta */
.feat-cta {
  margin: 0 56px 80px; background: var(--bg); border: 1.5px solid var(--border);
  border-radius: 24px; padding: 48px; text-align: center;
}
.feat-cta-title { font-weight: 800; font-size: 28px; letter-spacing: -1px; margin-bottom: 10px; }
.feat-cta-sub { font-size: 15px; color: var(--soft); margin-bottom: 28px; }
`;

const features = [
  { ic:"ic1", icon:"👤", num:"01", name:"User Registration & Login", info:"Secure account creation and authentication so users can save and revisit their MVP plans anytime.", tags:["JWT Auth","Session management","Email verification"] },
  { ic:"ic2", icon:"💡", num:"02", name:"Startup Idea Submission", info:"A clean, guided form where founders describe their startup concept, target users, and industry category.", tags:["Multi-field form","Validation","Category selection"] },
  { ic:"ic3", icon:"🔍", num:"03", name:"Input Preprocessing & Validation", info:"Flask backend sanitizes and validates the idea input before passing it to the AI, ensuring quality output every time.", tags:["Server-side validation","Input cleaning","Error handling"] },
  { ic:"ic4", icon:"⚡", num:"04", name:"AI-Based MVP Feature List", info:"Gemini AI analyzes the idea and generates the exact core features your MVP needs — prioritized and structured.", tags:["Gemini API","Prompt engineering","Structured output"] },
  { ic:"ic5", icon:"🔧", num:"05", name:"Technology Stack Recommendation", info:"Smart, opinionated suggestions for frontend, backend, and database technologies matched to your idea's complexity.", tags:["React","Flask","PostgreSQL"] },
  { ic:"ic6", icon:"🗄️", num:"06", name:"Database Schema Generation", info:"Auto-generated tables, columns, and relationships so your data model is solid from day one.", tags:["PostgreSQL schema","ER design","Normalization"] },
  { ic:"ic7", icon:"🗺️", num:"07", name:"Development Roadmap Creation", info:"A week-by-week sprint plan that prioritizes what to build first so your team never wastes a day.", tags:["Sprint planning","Milestones","Priority order"] },
  { ic:"ic8", icon:"💾", num:"08", name:"Storage of Generated Plans", info:"Every MVP plan you generate is automatically saved to the database and accessible via your personal dashboard.", tags:["PostgreSQL storage","User history","Plan management"] },
  { ic:"ic9", icon:"📄", num:"09", name:"Export MVP Plan as PDF", info:"Download a polished, formatted PDF of your entire MVP blueprint to share with developers, investors, or your team.", tags:["PDF generation","Formatted report","One-click export"] },
];

const tiers = [
  { label:"Presentation Tier", lc:"tl-coral", items:[{dot:"#FF6B6B",name:"React.js",note:"Frontend UI"},{dot:"#FF8FAB",name:"HTML / CSS / JSX",note:"Markup & styles"}] },
  { label:"Business Tier",     lc:"tl-teal",  items:[{dot:"#00C9A7",name:"Python + Flask",note:"Backend server"},{dot:"#38BDF8",name:"Node.js",note:"Runtime"},{dot:"#FFB347",name:"Gemini API",note:"AI generation"}] },
  { label:"Data Access Tier",  lc:"tl-indigo",items:[{dot:"#5B5FEF",name:"PostgreSQL",note:"Primary database"},{dot:"#A5B4FC",name:"SQLAlchemy ORM",note:"Query layer"}] },
];

export default function Features() {
  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="page">

        <div className="feat-hero">
          <div className="section-chip">Capabilities</div>
          <h1 className="section-title fade-up">All 9 Functionalities,<br/>Explained</h1>
          <p className="section-sub fade-up delay-1">
            Every feature of IdeaToMVP is built to take you from a rough idea to a complete, developer-ready plan as fast as possible.
          </p>
          <div className="fade-up delay-2">
            <Link to="/demo" className="btn-coral">Try them all free →</Link>
          </div>
        </div>

        {/* FEATURE CARDS */}
        <section className="feat-section">
          <div className="feat-grid">
            {features.map((f,i) => (
              <div key={i} className={`feat-card fade-up`} style={{animationDelay:`${(i%3)*0.1}s`}}>
                <div className={`feat-icon-wrap ${f.ic}`}>{f.icon}</div>
                <div>
                  <div className="feat-num">Feature {f.num}</div>
                  <div className="feat-name">{f.name}</div>
                </div>
                <div className="feat-info">{f.info}</div>
                <div className="feat-tags">
                  {f.tags.map(t => <span key={t} className="ftag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TECH TIERS */}
        <section className="tech-section">
          <h2 className="tech-title">🏗️ Technology Architecture</h2>
          <div className="tech-tiers">
            {tiers.map(t => (
              <div key={t.label} className="tech-tier">
                <div className={`tier-label ${t.lc}`}>{t.label}</div>
                {t.items.map(it => (
                  <div key={it.name} className="tech-item">
                    <div className="tech-dot" style={{background:it.dot}} />
                    <div>
                      <div style={{fontWeight:700}}>{it.name}</div>
                      <div style={{fontSize:12,color:"var(--soft)"}}>{it.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="feat-cta fade-up">
          <div className="feat-cta-title">See all features in action</div>
          <div className="feat-cta-sub">Submit your idea and get every feature working for your startup — completely free.</div>
          <Link to="/demo" className="btn-coral">Generate My MVP Blueprint →</Link>
        </div>

        <Footer />
      </div>
    </>
  );
}
