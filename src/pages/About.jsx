import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const css = `
.about-hero {
  background: linear-gradient(160deg, #fff 0%, #f0eeff 100%);
  padding: 80px 56px 64px; text-align: center;
  border-bottom: 1px solid var(--border);
}
.about-hero .section-sub { max-width: 520px; margin: 0 auto; }

/* project info */
.project-section { padding: 80px 56px 0; }
.project-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 40px; }
.project-card {
  background: #fff; border: 1.5px solid var(--border); border-radius: 20px; padding: 32px;
}
.project-card-title { font-weight: 800; font-size: 18px; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
.project-desc { font-size: 15px; color: var(--soft); line-height: 1.75; }
.project-list { display: flex; flex-direction: column; gap: 10px; }
.project-list-item {
  display: flex; align-items: center; gap: 12px;
  font-size: 14px; padding: 10px 14px;
  background: var(--bg); border-radius: 10px;
}
.pli-num {
  width: 26px; height: 26px; border-radius: 7px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 800; color: #fff;
}

/* team */
.team-section { padding: 64px 56px 80px; }
.team-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; margin-top: 40px; }
.team-card {
  background: #fff; border: 1.5px solid var(--border); border-radius: 20px; padding: 28px;
  text-align: center; transition: transform .2s, box-shadow .2s;
  cursor: default;
}
.team-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(91,95,239,0.1); }
.team-avatar {
  width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 16px;
  display: flex; align-items: center; justify-content: center;
  font-size: 30px; font-weight: 800; color: #fff;
}
.ta1 { background: linear-gradient(135deg, var(--coral), #ff8e53); }
.ta2 { background: linear-gradient(135deg, var(--teal), var(--sky)); }
.ta3 { background: linear-gradient(135deg, var(--indigo), var(--pink)); }
.ta4 { background: linear-gradient(135deg, var(--amber), var(--coral)); }
.team-name { font-weight: 800; font-size: 16px; margin-bottom: 4px; }
.team-id {
  font-size: 12px; color: var(--soft); margin-bottom: 12px;
  font-family: monospace; letter-spacing: 0.5px;
}
.team-role {
  display: inline-block;
  font-size: 12px; font-weight: 600; padding: 5px 12px; border-radius: 100px;
  margin-bottom: 12px;
}
.tr1 { background: rgba(255,107,107,0.1); color: var(--coral); }
.tr2 { background: rgba(0,201,167,0.1); color: var(--teal); }
.tr3 { background: rgba(91,95,239,0.1); color: var(--indigo); }
.tr4 { background: rgba(255,179,71,0.15); color: #c47c00; }
.team-tasks { display: flex; flex-direction: column; gap: 6px; }
.team-task {
  font-size: 12px; color: var(--soft); padding: 5px 0;
  border-top: 1px solid var(--border);
}
.team-task:first-child { border-top: none; }

/* quote / mission */
.mission-section {
  margin: 0 56px 80px;
  background: linear-gradient(135deg, var(--indigo), var(--coral));
  border-radius: 24px; padding: 60px;
  text-align: center; color: #fff;
}
.mission-title {
  font-family: 'Instrument Serif', serif; font-style: italic;
  font-size: clamp(28px, 3.5vw, 46px); font-weight: 400;
  letter-spacing: -1px; line-height: 1.25; margin-bottom: 20px;
}
.mission-sub { font-size: 15px; opacity: 0.75; margin-bottom: 32px; }
`;

const team = [
  { av:"ta1", initial:"A", name:"Akshay Purohit",       id:"202512033", tr:"tr1", role:"Frontend Developer", tasks:["React.js UI design","User interaction flows","Component architecture"] },
  { av:"ta2", initial:"N", name:"Nirav Kachhiya",        id:"202512011", tr:"tr2", role:"Backend Developer",  tasks:["Flask API development","AI prompt engineering","Backend integration"] },
  { av:"ta3", initial:"Ac", name:"Achyut Pathak",        id:"202512039", tr:"tr3", role:"AI Integration",     tasks:["Gemini API setup","Prompt engineering","Output formatting"] },
  { av:"ta4", initial:"M", name:"Monar Dudhat",          id:"202512019", tr:"tr4", role:"Database & QA",      tasks:["PostgreSQL schema","Testing & debugging","Documentation"] },
];

const funcs = [
  ["#FF6B6B","User registration and login"],
  ["#FFB347","Startup idea submission"],
  ["#00C9A7","Input preprocessing & validation"],
  ["#38BDF8","AI-based MVP feature list"],
  ["#5B5FEF","Technology stack recommendation"],
  ["#FF8FAB","Database schema generation"],
  ["#FF6B6B","Development roadmap creation"],
  ["#00C9A7","Storage of generated MVP plans"],
  ["#5B5FEF","Export MVP plan as PDF"],
];

export default function About() {
  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="page">

        <div className="about-hero">
          <div className="section-chip">About</div>
          <h1 className="section-title fade-up">Meet the Team Behind<br/>IdeaToMVP</h1>
          <p className="section-sub fade-up delay-1">
            We're four MSCIT students who built an AI-powered tool to help startup founders go from idea to developer-ready MVP plan — instantly.
          </p>
        </div>

        {/* PROJECT INFO */}
        <section className="project-section">
          <div className="section-chip">The Project</div>
          <h2 className="section-title">From Idea to MVP —<br/>AI Software Architect</h2>
          <div className="project-grid">
            <div className="project-card">
              <div className="project-card-title">📋 Project Overview</div>
              <p className="project-desc">
                IdeaToMVP is an AI-powered platform that helps startup founders and entrepreneurs transform a rough idea into a complete Minimum Viable Product plan.
                <br/><br/>
                Powered by <strong>Google Gemini AI</strong>, it automatically generates a prioritized feature list, the best technology stack, a database schema, and a week-by-week development roadmap — all in under 30 seconds.
                <br/><br/>
                Built as part of our MSCIT program final project.
              </p>
            </div>
            <div className="project-card">
              <div className="project-card-title">⚙️ 9 Core Functionalities</div>
              <div className="project-list">
                {funcs.map(([color, label], i) => (
                  <div key={i} className="project-list-item">
                    <div className="pli-num" style={{background:color}}>{String(i+1).padStart(2,"0")}</div>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="team-section">
          <div className="section-chip">Our Team</div>
          <h2 className="section-title">4 Builders, 1 Vision</h2>
          <div className="team-grid">
            {team.map((m, i) => (
              <div key={i} className={`team-card fade-up`} style={{animationDelay:`${i*0.1}s`}}>
                <div className={`team-avatar ${m.av}`}>{m.initial}</div>
                <div className="team-name">{m.name}</div>
                <div className="team-id">{m.id}</div>
                <span className={`team-role ${m.tr}`}>{m.role}</span>
                <div className="team-tasks">
                  {m.tasks.map(t => <div key={t} className="team-task">{t}</div>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MISSION */}
        <div className="mission-section fade-up">
          <div className="mission-title">"The fastest way from startup idea<br/>to developer-ready spec."</div>
          <div className="mission-sub">Built with React.js · Flask · Gemini AI · PostgreSQL</div>
          <Link to="/demo" className="btn-white" style={{background:"#fff",color:"var(--indigo)",border:"none",padding:"14px 30px",borderRadius:"100px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:15,cursor:"pointer",textDecoration:"none",display:"inline-block"}}>
            Try It Free →
          </Link>
        </div>

        <Footer />
      </div>
    </>
  );
}
