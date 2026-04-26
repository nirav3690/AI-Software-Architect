import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { generateMVP } from "../api";

const css = `
.demo-hero {
  background: linear-gradient(160deg, #fff 0%, #f0eeff 100%);
  padding: 70px 56px 56px; text-align: center;
  border-bottom: 1px solid var(--border);
}
.demo-hero .section-sub { max-width: 480px; margin: 0 auto; }

.demo-main { padding: 60px 56px 80px; }
.demo-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 48px; align-items: start; }

.form-box {
  background: #fff; border: 1.5px solid var(--border); border-radius: 24px; padding: 36px;
  box-shadow: 0 8px 40px rgba(91,95,239,0.09); position: sticky; top: 88px;
}
.form-box-title { font-weight: 800; font-size: 21px; margin-bottom: 6px; }
.form-box-sub { font-size: 14px; color: var(--soft); margin-bottom: 28px; }
.fg { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
.fl { font-size: 13px; font-weight: 600; }
.fi, .fta, .fsel {
  font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px;
  padding: 12px 16px; border: 1.5px solid var(--border); border-radius: 12px;
  background: var(--bg); color: var(--text); outline: none;
  transition: border-color .2s, box-shadow .2s; resize: vertical;
}
.fi:focus, .fta:focus, .fsel:focus {
  border-color: var(--indigo); box-shadow: 0 0 0 3px rgba(91,95,239,0.12);
}
.fta { min-height: 120px; }
.fsub {
  width: 100%; margin-top: 8px;
  background: linear-gradient(135deg, var(--indigo), var(--coral));
  color: #fff; border: none; padding: 15px;
  border-radius: 12px; font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700; font-size: 15px; cursor: pointer;
  box-shadow: 0 6px 20px rgba(91,95,239,0.3);
  transition: transform .15s, box-shadow .15s;
}
.fsub:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(91,95,239,0.4); }
.fsub:disabled { opacity: 0.7; cursor: not-allowed; }

.form-divider {
  display: flex; align-items: center; gap: 12px; margin: 20px 0;
  color: var(--soft); font-size: 12px; font-weight: 600;
}
.form-divider::before, .form-divider::after {
  content: ''; flex: 1; height: 1px; background: var(--border);
}

.output-area { display: flex; flex-direction: column; gap: 0; }
.output-label {
  display: flex; align-items: center; gap: 10px;
  font-weight: 800; font-size: 18px; margin-bottom: 20px;
}
.output-label-dot {
  width: 10px; height: 10px; border-radius: 50%; background: var(--teal);
  animation: pulse 2s infinite;
}

.out-card {
  background: #fff; border: 1.5px solid var(--border); border-radius: 16px; padding: 24px;
  margin-bottom: 16px;
  opacity: 0; transform: translateY(20px);
  transition: opacity .5s ease, transform .5s ease;
}
.out-card.show { opacity: 1; transform: none; }
.out-card-hdr { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
.out-badge {
  width: 32px; height: 32px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; font-size: 16px;
}
.ob1 { background: rgba(255,107,107,0.12); }
.ob2 { background: rgba(0,201,167,0.12); }
.ob3 { background: rgba(91,95,239,0.12); }
.ob4 { background: rgba(255,179,71,0.15); }
.out-card-title { font-weight: 800; font-size: 15px; }
.out-items { display: flex; flex-direction: column; gap: 8px; }
.out-item {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 13px; color: var(--text); padding: 8px 12px;
  background: var(--bg); border-radius: 8px;
}
.out-check {
  width: 18px; height: 18px; border-radius: 5px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; color: #fff; margin-top: 1px;
}
.pill-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
.out-pill {
  font-size: 12px; font-weight: 600; padding: 5px 13px; border-radius: 100px;
  background: var(--bg); border: 1.5px solid var(--border);
}
.schema-box {
  background: var(--text); color: #e8e3ff; border-radius: 10px;
  padding: 16px; font-family: monospace; font-size: 12px; line-height: 1.7;
  overflow-x: auto;
}
.schema-comment { color: #5b5fef99; }
.schema-key { color: var(--sky); }
.schema-val { color: var(--teal); }

.empty-box {
  border: 2px dashed var(--border); border-radius: 20px; padding: 60px 32px;
  text-align: center; color: var(--soft);
}
.empty-box-icon { font-size: 48px; margin-bottom: 16px; }
.empty-box-text { font-size: 15px; line-height: 1.6; }

.loading-dots { display: flex; gap: 6px; align-items: center; justify-content: center; }
.dot-anim {
  width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.8);
  animation: dotBounce 1.2s infinite;
}
.dot-anim:nth-child(2) { animation-delay: .2s; }
.dot-anim:nth-child(3) { animation-delay: .4s; }
@keyframes dotBounce {
  0%,80%,100% { transform: scale(0.7); opacity:0.5; }
  40%          { transform: scale(1);   opacity:1; }
}

.api-error {
  font-size: 13px; color: var(--coral);
  background: rgba(255,107,107,0.08);
  padding: 10px 14px; border-radius: 8px;
  border: 1px solid rgba(255,107,107,0.2);
  margin-bottom: 16px;
}
`;

export default function Demo() {
  const [idea, setIdea]           = useState("");
  const [targetUsers, setTargetUsers] = useState("");
  const [category, setCategory]   = useState("");
  const [name, setName]           = useState("");
  const [loading, setLoading]     = useState(false);
  const [done, setDone]           = useState(false);
  const [planId, setPlanId]       = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [apiError, setApiError]   = useState("");
  const [planData, setPlanData]   = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!idea.trim()) return;
    setLoading(true);
    setDone(false);
    setApiError("");
    setPlanData(null);

    try {
      const data = await generateMVP(idea, targetUsers, category);

      if (data.plan) {
        setPlanData(data.plan.plan);
        setPlanId(data.plan_id || data.plan?.id || null);
        setDone(true);
      } else if (data.error) {
        setApiError(data.error);
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setApiError("Could not connect to server. Make sure the backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setIdea(""); setCategory(""); setTargetUsers(""); setName("");
    setDone(false); setPlanData(null); setApiError(""); setPlanId(null);
  };

  const downloadPDF = async () => {
    if (!planId) { alert("Plan ID not available. Please generate again."); return; }
    setDownloading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:5000/api/pdf/export/${planId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href = url; a.download = `MVP_Plan_${planId}.pdf`; a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("PDF export failed. Make sure reportlab is installed:\npip install reportlab");
    } finally {
      setDownloading(false);
    }
  };

  // Build schema preview from real data
  const renderSchema = () => {
    if (!planData?.database_schema) return null;
    return planData.database_schema.map((table) => (
      <div key={table.table} style={{ marginBottom: 12 }}>
        <div><span className="schema-comment">-- {table.table} table</span></div>
        {table.columns.map((col) => (
          <div key={col.name}>
            <span className="schema-key">{col.name}</span>{"  "}
            <span className="schema-val">{col.type} {col.constraints}</span>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="page">

        <div className="demo-hero">
          <div className="section-chip">Try it Free</div>
          <h1 className="section-title fade-up">Generate Your MVP Plan</h1>
          <p className="section-sub fade-up delay-1">
            Describe your startup idea below and our AI will generate a complete MVP blueprint in seconds.
          </p>
        </div>

        <div className="demo-main">
          <div className="demo-grid">

            {/* FORM */}
            <div className="form-box fade-up">
              <div className="form-box-title">🚀 Your Startup Idea</div>
              <div className="form-box-sub">Fill in the details below — be as specific or as brief as you like.</div>

              {apiError && <div className="api-error">⚠️ {apiError}</div>}

              <form onSubmit={submit}>
                <div className="fg">
                  <label className="fl">Your Name</label>
                  <input className="fi" type="text" placeholder="e.g. First Name Last Name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="fg">
                  <label className="fl">Startup Idea *</label>
                  <textarea className="fta"
                    placeholder="e.g. An app where university students can exchange skills — one student teaches coding, another teaches design, no money involved..."
                    value={idea} onChange={e => setIdea(e.target.value)} required />
                </div>
                <div className="fg">
                  <label className="fl">Target Users</label>
                  <input className="fi" type="text" placeholder="e.g. College students aged 18–24" value={targetUsers} onChange={e => setTargetUsers(e.target.value)} />
                </div>
                <div className="fg">
                  <label className="fl">Industry / Category</label>
                  <select className="fsel" value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">Select a category</option>
                    <option>SaaS / Productivity</option>
                    <option>Marketplace</option>
                    <option>Social / Community</option>
                    <option>FinTech</option>
                    <option>HealthTech</option>
                    <option>EdTech</option>
                    <option>Other</option>
                  </select>
                </div>
                <button className="fsub" type="submit" disabled={loading}>
                  {loading
                    ? <div className="loading-dots"><div className="dot-anim"/><div className="dot-anim"/><div className="dot-anim"/></div>
                    : "✨ Generate MVP Blueprint →"
                  }
                </button>
                {done && (
                  <button type="button" onClick={reset}
                    style={{width:"100%",marginTop:10,background:"none",border:"1.5px solid var(--border)",
                      borderRadius:12,padding:"12px",fontFamily:"'Plus Jakarta Sans',sans-serif",
                      fontWeight:600,fontSize:14,cursor:"pointer",color:"var(--soft)"}}>
                    ↺ Try another idea
                  </button>
                )}
              </form>
            </div>

            {/* OUTPUT */}
            <div className="output-area">
              {done && planData ? (
                <>
                  <div className="output-label fade-up">
                    <div className="output-label-dot" />
                    Your AI-Generated Blueprint
                  </div>

                  {/* Features */}
                  <div className="out-card show" style={{transitionDelay:"0s"}}>
                    <div className="out-card-hdr">
                      <div className="out-badge ob1">⚡</div>
                      <div className="out-card-title">Core MVP Features</div>
                    </div>
                    <div className="out-items">
                      {planData.features?.map((f, i) => (
                        <div key={i} className="out-item">
                          <div className="out-check" style={{background:"#FF6B6B"}}>✓</div>
                          <div>
                            <strong>{f.name}</strong> — {f.description}
                            <span style={{marginLeft:8,fontSize:11,color:"var(--soft)"}}>({f.priority})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="out-card show" style={{transitionDelay:"0.15s"}}>
                    <div className="out-card-hdr">
                      <div className="out-badge ob2">🔧</div>
                      <div className="out-card-title">Recommended Technology Stack</div>
                    </div>
                    <div className="pill-wrap">
                      {planData.tech_stack?.flatMap(t => t.technologies).map((tech, i) => (
                        <span key={i} className="out-pill">{tech}</span>
                      ))}
                    </div>
                  </div>

                  {/* DB Schema */}
                  <div className="out-card show" style={{transitionDelay:"0.3s"}}>
                    <div className="out-card-hdr">
                      <div className="out-badge ob3">🗄️</div>
                      <div className="out-card-title">Database Schema (Preview)</div>
                    </div>
                    <div className="schema-box">{renderSchema()}</div>
                  </div>

                  {/* Roadmap */}
                  <div className="out-card show" style={{transitionDelay:"0.45s"}}>
                    <div className="out-card-hdr">
                      <div className="out-badge ob4">🗺️</div>
                      <div className="out-card-title">Development Roadmap</div>
                    </div>
                    <div className="out-items">
                      {planData.roadmap?.map((r, i) => (
                        <div key={i} className="out-item">
                          <div className="out-check" style={{background:"#5B5FEF"}}>✓</div>
                          <div><strong>{r.phase}:</strong> {r.deliverables?.join(", ")}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Download card */}
                  <div className="out-card show" style={{transitionDelay:"0.6s",background:"linear-gradient(135deg,var(--coral),var(--indigo))",border:"none"}}>
                    <div style={{color:"#fff",textAlign:"center",padding:"8px 0"}}>
                      <div style={{fontSize:24,marginBottom:8}}>📄</div>
                      <div style={{fontWeight:800,fontSize:17,marginBottom:6}}>Blueprint ready!</div>
                      <div style={{fontSize:13,opacity:0.85,marginBottom:20}}>Your full MVP plan has been saved to your dashboard.</div>
                      <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
                        <button
                          onClick={downloadPDF}
                          disabled={downloading}
                          style={{background:"rgba(255,255,255,0.2)",backdropFilter:"blur(8px)",
                            border:"1.5px solid rgba(255,255,255,0.4)",color:"#fff",
                            padding:"10px 22px",borderRadius:100,fontFamily:"'Plus Jakarta Sans',sans-serif",
                            fontWeight:700,fontSize:13,cursor:downloading?"not-allowed":"pointer",
                            transition:"background .2s",opacity:downloading?0.6:1}}
                        >
                          {downloading ? "Generating PDF..." : "⬇ Download PDF"}
                        </button>
                        <a href="/my-plans"
                          style={{background:"rgba(255,255,255,0.9)",color:"var(--indigo)",
                            padding:"10px 22px",borderRadius:100,fontFamily:"'Plus Jakarta Sans',sans-serif",
                            fontWeight:700,fontSize:13,textDecoration:"none",display:"inline-block"}}
                        >
                          📋 View All Plans
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="empty-box fade-up delay-1">
                  <div className="empty-box-icon">✨</div>
                  <div className="empty-box-text">
                    Your AI-generated MVP blueprint will appear here.<br/>
                    Fill in the form and hit <strong>Generate</strong>!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
