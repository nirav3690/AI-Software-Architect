import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getMyPlans } from "../api";

const css = `
.plans-hero {
  background: linear-gradient(160deg, #fff 0%, #f0eeff 100%);
  padding: 70px 56px 48px;
  border-bottom: 1px solid var(--border);
  text-align: center;
}
.plans-hero .section-sub { max-width: 480px; margin: 0 auto; }

.plans-main { padding: 48px 56px 80px; max-width: 960px; margin: 0 auto; }

.plans-toolbar {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 28px; flex-wrap: wrap; gap: 16px;
}
.plans-count {
  font-size: 14px; color: var(--soft); font-weight: 500;
}
.plans-count span { font-weight: 800; color: var(--text); }

/* Plan card */
.plan-card {
  background: #fff; border: 1.5px solid var(--border); border-radius: 24px;
  padding: 28px; margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(91,95,239,0.05);
  transition: box-shadow .2s, transform .2s;
}
.plan-card:hover { box-shadow: 0 10px 36px rgba(91,95,239,0.12); transform: translateY(-2px); }

.plan-card-header {
  display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;
  margin-bottom: 16px;
}
.plan-card-meta { flex: 1; }
.plan-date {
  font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--soft); margin-bottom: 8px;
}
.plan-idea {
  font-weight: 700; font-size: 16px; line-height: 1.45; color: var(--text);
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

.plan-badges { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
.plan-badge {
  font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 100px;
  border: 1.5px solid;
}
.pb-coral { color: var(--coral); border-color: rgba(255,107,107,0.3); background: rgba(255,107,107,0.07); }
.pb-indigo { color: var(--indigo); border-color: rgba(91,95,239,0.25); background: rgba(91,95,239,0.07); }
.pb-teal { color: #059669; border-color: rgba(5,150,105,0.25); background: rgba(5,150,105,0.07); }
.pb-amber { color: #D97706; border-color: rgba(217,119,6,0.25); background: rgba(217,119,6,0.07); }

/* Tech pills strip */
.tech-strip { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px; }
.tech-pill {
  font-size: 12px; font-weight: 600; padding: 4px 11px; border-radius: 100px;
  background: var(--bg); border: 1.5px solid var(--border); color: var(--soft);
}

.plan-card-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.plan-btn-view {
  background: linear-gradient(135deg, var(--indigo), var(--coral));
  color: #fff; border: none; padding: 10px 20px; border-radius: 100px;
  font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 13px;
  cursor: pointer; box-shadow: 0 4px 14px rgba(91,95,239,0.3);
  transition: transform .15s, box-shadow .15s;
}
.plan-btn-view:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(91,95,239,0.4); }
.plan-btn-pdf {
  background: none; border: 1.5px solid var(--border); padding: 10px 20px;
  border-radius: 100px; font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700; font-size: 13px; color: var(--soft); cursor: pointer;
  transition: border-color .2s, color .2s, transform .15s;
}
.plan-btn-pdf:hover { border-color: var(--teal); color: var(--teal); transform: translateY(-2px); }
.plan-btn-pdf:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

/* Expanded plan detail */
.plan-detail {
  border-top: 1px solid var(--border); margin-top: 20px; padding-top: 20px;
  display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
}
.plan-section-title {
  font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;
  color: var(--soft); margin-bottom: 12px;
}
.feature-item {
  display: flex; align-items: flex-start; gap: 8px;
  font-size: 13px; padding: 8px 10px; border-radius: 8px;
  background: var(--bg); margin-bottom: 6px; line-height: 1.4;
}
.feature-dot {
  width: 16px; height: 16px; border-radius: 5px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: 9px; color: #fff;
}
.road-item {
  display: flex; gap: 12px; margin-bottom: 10px;
}
.road-num {
  width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg, var(--indigo), var(--coral));
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 800; color: #fff;
}
.road-text { font-size: 13px; line-height: 1.5; }
.road-phase { font-weight: 700; }

/* Empty state */
.empty-state {
  text-align: center; padding: 80px 32px;
  border: 2px dashed var(--border); border-radius: 24px;
}
.empty-state-icon { font-size: 52px; margin-bottom: 16px; }
.empty-state-title { font-weight: 800; font-size: 22px; margin-bottom: 10px; }
.empty-state-sub { font-size: 15px; color: var(--soft); margin-bottom: 28px; line-height: 1.6; }

@media (max-width: 768px) {
  .plans-hero { padding: 60px 24px 40px; }
  .plans-main { padding: 32px 24px 60px; }
  .plan-detail { grid-template-columns: 1fr; }
}
`;

export default function MyPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(null);   // plan id currently expanded
  const [downloading, setDownloading] = useState(null); // plan id being downloaded

  useEffect(() => {
    getMyPlans()
      .then(data => {
        setPlans(data.plans || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load plans. Make sure the backend is running.");
        setLoading(false);
      });
  }, []);

  const downloadPDF = async (planId) => {
    setDownloading(planId);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:5000/api/pdf/export/${planId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `MVP_Plan_${planId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("PDF export failed. Make sure reportlab is installed on the backend:\npip install reportlab");
    } finally {
      setDownloading(null);
    }
  };

  const priorityColor = (p) => ({
    High: "#FF6B6B", Medium: "#5B5FEF", Low: "#00C9A7"
  })[p] || "#6B7280";

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="page">

        {/* Hero */}
        <div className="plans-hero">
          <div className="section-chip">Saved Plans</div>
          <h1 className="section-title fade-up">My MVP Plans</h1>
          <p className="section-sub fade-up delay-1">
            All your AI-generated blueprints in one place. View details or export as PDF.
          </p>
        </div>

        <div className="plans-main">
          {/* Toolbar */}
          <div className="plans-toolbar">
            <div className="plans-count">
              <span>{plans.length}</span> plan{plans.length !== 1 ? "s" : ""} generated
            </div>
            <Link to="/demo" className="btn-indigo" style={{ fontSize: 14, padding: "10px 22px" }}>
              + Generate New MVP
            </Link>
          </div>

          {/* States */}
          {loading && (
            <div style={{ textAlign: "center", padding: 60 }}>
              <div style={{ fontSize: 36, marginBottom: 14, animation: "float 2s ease-in-out infinite" }}>📋</div>
              <p style={{ color: "var(--soft)" }}>Loading your plans...</p>
            </div>
          )}

          {error && (
            <div className="dash-error" style={{ marginBottom: 20, padding: "14px 18px", borderRadius: 14 }}>
              ⚠️ {error}
            </div>
          )}

          {!loading && !error && plans.length === 0 && (
            <div className="empty-state fade-up">
              <div className="empty-state-icon">💡</div>
              <div className="empty-state-title">No plans yet</div>
              <div className="empty-state-sub">
                Submit your first startup idea and our AI will generate<br />
                a complete MVP blueprint in under 30 seconds.
              </div>
              <Link to="/demo" className="btn-coral">✨ Generate My First MVP →</Link>
            </div>
          )}

          {/* Plan Cards */}
          {plans.map((plan, i) => {
            const p = plan.plan || {};
            const features = p.features || [];
            const techs = (p.tech_stack || []).flatMap(t => t.technologies || []);
            const roadmap = p.roadmap || [];
            const isOpen = expanded === plan.id;

            return (
              <div key={plan.id} className={`plan-card fade-up delay-${Math.min(i, 3)}`}>

                {/* Header */}
                <div className="plan-card-header">
                  <div className="plan-card-meta">
                    <div className="plan-date">
                      {new Date(plan.created_at).toLocaleDateString("en-IN", {
                        day: "numeric", month: "long", year: "numeric"
                      })}
                    </div>
                    <div className="plan-idea">{plan.idea_text}</div>
                  </div>
                </div>

                {/* Badges */}
                <div className="plan-badges">
                  <span className="plan-badge pb-coral">🚀 {features.length} features</span>
                  <span className="plan-badge pb-indigo">🛠️ {techs.length} technologies</span>
                  <span className="plan-badge pb-teal">🗄️ {(p.database_schema || []).length} tables</span>
                  <span className="plan-badge pb-amber">🗓️ {roadmap.length} phases</span>
                </div>

                {/* Tech pill strip */}
                {techs.length > 0 && (
                  <div className="tech-strip">
                    {techs.slice(0, 8).map((t, j) => (
                      <span key={j} className="tech-pill">{t}</span>
                    ))}
                    {techs.length > 8 && (
                      <span className="tech-pill" style={{ color: "var(--indigo)" }}>+{techs.length - 8} more</span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="plan-card-actions">
                  <button
                    className="plan-btn-view"
                    onClick={() => setExpanded(isOpen ? null : plan.id)}
                  >
                    {isOpen ? "▲ Hide Details" : "▼ View Full Plan"}
                  </button>
                  <button
                    className="plan-btn-pdf"
                    onClick={() => downloadPDF(plan.id)}
                    disabled={downloading === plan.id}
                  >
                    {downloading === plan.id ? "Generating PDF..." : "📄 Export PDF"}
                  </button>
                </div>

                {/* Expanded Details */}
                {isOpen && (
                  <div className="plan-detail">
                    {/* Features */}
                    <div>
                      <div className="plan-section-title">⚡ Core Features</div>
                      {features.map((f, j) => (
                        <div key={j} className="feature-item">
                          <div className="feature-dot" style={{ background: priorityColor(f.priority) }}>✓</div>
                          <div>
                            <strong>{f.name}</strong>
                            <span style={{ marginLeft: 6, fontSize: 11, color: "var(--soft)" }}>({f.priority})</span>
                            <br />
                            <span style={{ color: "var(--soft)" }}>{f.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Roadmap */}
                    <div>
                      <div className="plan-section-title">🗓️ Roadmap</div>
                      {roadmap.map((r, j) => (
                        <div key={j} className="road-item">
                          <div className="road-num">{j + 1}</div>
                          <div className="road-text">
                            <div className="road-phase">{r.phase}</div>
                            <div style={{ color: "var(--soft)" }}>{(r.deliverables || []).slice(0, 2).join(" · ")}</div>
                          </div>
                        </div>
                      ))}

                      {/* DB Schema preview */}
                      <div className="plan-section-title" style={{ marginTop: 20 }}>🗄️ Database Tables</div>
                      {(p.database_schema || []).map((tbl, j) => (
                        <div key={j} style={{ marginBottom: 8 }}>
                          <span style={{ fontWeight: 700, fontSize: 13 }}>{tbl.table}</span>
                          <span style={{ color: "var(--soft)", fontSize: 12, marginLeft: 8 }}>
                            ({(tbl.columns || []).length} columns)
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Implementation Steps — full width below */}
                    {(p.implementation_steps || []).length > 0 && (
                      <div style={{ gridColumn: "1 / -1", marginTop: 20 }}>
                        <div className="plan-section-title">🛠️ Implementation Guide</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                          {(p.implementation_steps || []).map((stage, si) => {
                            const stageColors = ["#1E3A5F", "#0E7490", "#065F46", "#92400E", "#5B21B6", "#9D174D"];
                            const col = stageColors[si % stageColors.length];
                            return (
                              <div key={si} style={{ border: `1.5px solid ${col}30`, borderRadius: 12, overflow: "hidden" }}>
                                {/* Stage header */}
                                <div style={{ background: col, color: "#fff", padding: "10px 16px", fontWeight: 700, fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                  {stage.stage}
                                </div>
                                {/* Steps */}
                                <div style={{ padding: "4px 0" }}>
                                  {(stage.steps || []).map((step, stj) => (
                                    <div key={stj} style={{ padding: "10px 16px", borderBottom: `1px solid ${col}18` }}>
                                      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                                        <div style={{
                                          width: 26, height: 26, borderRadius: "50%", background: col,
                                          color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                                          fontSize: 11, fontWeight: 800, flexShrink: 0
                                        }}>{step.step_number}</div>
                                        <div style={{ flex: 1 }}>
                                          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{step.title}</div>
                                          <div style={{ fontSize: 12, color: "var(--soft)", lineHeight: 1.6, marginBottom: 6 }}>{step.description}</div>
                                          {(step.commands || []).length > 0 && (
                                            <div style={{ background: "#F1F5F9", borderRadius: 8, padding: "8px 12px", marginBottom: 6 }}>
                                              {step.commands.map((cmd, ci) => (
                                                <div key={ci} style={{ fontFamily: "monospace", fontSize: 12, color: "#1E293B", lineHeight: 1.8 }}>
                                                  <span style={{ color: col, fontWeight: 700 }}>$ </span>{cmd}
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                          {step.verify && (
                                            <div style={{ fontSize: 11, color: "#065F46", background: "#F0FDF4", borderRadius: 6, padding: "5px 10px", border: "1px solid #BBF7D0" }}>
                                              ✓ {step.verify}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <Footer />
      </div>
    </>
  );
}
