import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getUserProfile, updateProfile, changePassword } from "../api";

const css = `
.dash-hero {
  background: linear-gradient(160deg, #fff 0%, #f0eeff 100%);
  padding: 70px 56px 48px;
  border-bottom: 1px solid var(--border);
}
.dash-hero-inner {
  max-width: 960px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between; gap: 24px;
}
.dash-welcome { flex: 1; }
.dash-welcome-label {
  font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
  color: var(--indigo); background: rgba(91,95,239,0.1);
  padding: 5px 14px; border-radius: 100px; display: inline-block; margin-bottom: 14px;
}
.dash-welcome-title {
  font-weight: 800; font-size: 36px; letter-spacing: -1px; margin-bottom: 6px;
}
.dash-welcome-sub { font-size: 15px; color: var(--soft); }

.dash-avatar {
  width: 72px; height: 72px; border-radius: 20px;
  background: linear-gradient(135deg, var(--coral), var(--indigo));
  display: flex; align-items: center; justify-content: center;
  font-size: 30px; color: #fff; font-weight: 800; flex-shrink: 0;
}

/* Stats row */
.dash-stats {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
  max-width: 960px; margin: 0 auto; padding: 40px 56px 0;
}
.stat-card {
  background: #fff; border: 1.5px solid var(--border); border-radius: 20px;
  padding: 24px 28px; display: flex; align-items: center; gap: 18px;
  box-shadow: 0 4px 20px rgba(91,95,239,0.06);
  transition: transform .2s, box-shadow .2s;
}
.stat-card:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(91,95,239,0.12); }
.stat-icon {
  width: 52px; height: 52px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center; font-size: 22px;
  flex-shrink: 0;
}
.stat-icon-coral { background: rgba(255,107,107,0.12); }
.stat-icon-indigo { background: rgba(91,95,239,0.1); }
.stat-icon-teal  { background: rgba(0,201,167,0.1); }
.stat-num { font-weight: 800; font-size: 28px; letter-spacing: -1px; color: var(--text); }
.stat-lbl { font-size: 13px; color: var(--soft); margin-top: 2px; }

/* Main content */
.dash-body {
  max-width: 960px; margin: 0 auto;
  padding: 40px 56px 80px;
  display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 28px;
  align-items: start;
}

/* Cards */
.dash-card {
  background: #fff; border: 1.5px solid var(--border); border-radius: 24px;
  padding: 32px 28px; box-shadow: 0 4px 20px rgba(91,95,239,0.06);
}
.dash-card-title {
  font-weight: 800; font-size: 18px; margin-bottom: 4px;
  display: flex; align-items: center; gap: 10px;
}
.dash-card-sub { font-size: 13px; color: var(--soft); margin-bottom: 28px; }
.dash-divider { height: 1px; background: var(--border); margin: 20px 0; }

/* Profile info rows */
.info-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 0;
}
.info-row + .info-row { border-top: 1px solid var(--border); }
.info-label { font-size: 12px; font-weight: 700; color: var(--soft); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
.info-value { font-size: 15px; font-weight: 600; color: var(--text); }
.info-edit-btn {
  background: none; border: 1.5px solid var(--border); border-radius: 10px;
  padding: 7px 14px; font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px; font-weight: 600; color: var(--soft); cursor: pointer;
  transition: border-color .2s, color .2s;
}
.info-edit-btn:hover { border-color: var(--indigo); color: var(--indigo); }

/* Form fields */
.dash-fg { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.dash-label { font-size: 13px; font-weight: 600; color: var(--text); }
.dash-input {
  font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px;
  padding: 12px 16px; border: 1.5px solid var(--border);
  border-radius: 12px; background: var(--bg); color: var(--text);
  outline: none; transition: border-color .2s, box-shadow .2s; width: 100%;
}
.dash-input:focus { border-color: var(--indigo); box-shadow: 0 0 0 3px rgba(91,95,239,0.12); }

.dash-btn-primary {
  width: 100%; padding: 13px;
  background: linear-gradient(135deg, var(--indigo), var(--coral));
  color: #fff; border: none; border-radius: 12px;
  font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 14px;
  cursor: pointer; box-shadow: 0 4px 16px rgba(91,95,239,0.3);
  transition: transform .15s, box-shadow .15s; margin-top: 4px;
}
.dash-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(91,95,239,0.4); }
.dash-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

.dash-btn-ghost {
  background: none; border: 1.5px solid var(--border); border-radius: 12px;
  padding: 10px 18px; font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 600; font-size: 13px; color: var(--soft); cursor: pointer;
  transition: border-color .2s, color .2s;
}
.dash-btn-ghost:hover { border-color: var(--indigo); color: var(--indigo); }

/* Success / error messages */
.dash-success {
  font-size: 13px; color: #059669;
  background: rgba(5,150,105,0.08); padding: 10px 14px;
  border-radius: 10px; border: 1px solid rgba(5,150,105,0.2);
  margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
}
.dash-error {
  font-size: 13px; color: var(--coral);
  background: rgba(255,107,107,0.08); padding: 10px 14px;
  border-radius: 10px; border: 1px solid rgba(255,107,107,0.2);
  margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
}

/* Quick links card */
.quick-link {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px; border-radius: 14px; background: var(--bg);
  border: 1.5px solid var(--border); text-decoration: none; color: var(--text);
  transition: border-color .2s, background .2s, transform .15s;
  margin-bottom: 10px;
}
.quick-link:hover { border-color: var(--indigo); background: rgba(91,95,239,0.04); transform: translateX(3px); }
.quick-link-left { display: flex; align-items: center; gap: 12px; }
.quick-link-icon {
  width: 36px; height: 36px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; font-size: 17px;
}
.quick-link-title { font-weight: 700; font-size: 14px; }
.quick-link-sub { font-size: 12px; color: var(--soft); }
.quick-link-arrow { font-size: 18px; color: var(--soft); }

/* Danger zone */
.danger-card {
  background: rgba(255,107,107,0.04); border: 1.5px solid rgba(255,107,107,0.2);
  border-radius: 20px; padding: 24px 28px; margin-top: 8px;
}
.danger-title { font-weight: 800; font-size: 15px; color: var(--coral); margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
.danger-sub { font-size: 13px; color: var(--soft); margin-bottom: 18px; line-height: 1.6; }
.danger-btn {
  background: var(--coral); color: #fff; border: none;
  padding: 10px 22px; border-radius: 100px;
  font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 13px;
  cursor: pointer; transition: transform .15s, box-shadow .15s;
}
.danger-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(255,107,107,0.4); }

@media (max-width: 900px) {
  .dash-hero { padding: 60px 24px 40px; }
  .dash-stats { grid-template-columns: 1fr 1fr; padding: 32px 24px 0; }
  .dash-body { grid-template-columns: 1fr; padding: 32px 24px 60px; }
}
@media (max-width: 600px) {
  .dash-stats { grid-template-columns: 1fr; }
  .dash-hero-inner { flex-direction: column; align-items: flex-start; }
}
`;

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ total_ideas: 0, total_plans: 0 });
  const [loading, setLoading] = useState(true);

  // Edit name state
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [nameMsg, setNameMsg] = useState({ type: "", text: "" });
  const [savingName, setSavingName] = useState(false);

  // Change password state
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwMsg, setPwMsg] = useState({ type: "", text: "" });
  const [savingPw, setSavingPw] = useState(false);

  // Delete confirmation
  const [showDelete, setShowDelete] = useState(false);
  const [deletePw, setDeletePw] = useState("");

  useEffect(() => {
    // Fetch profile from backend
    getUserProfile()
      .then(data => {
        if (data.user) {
          setProfile(data.user);
          setStats(data.stats || { total_ideas: 0, total_plans: 0 });
          setNewName(data.user.name);
        }
      })
      .catch(() => {
        // Fallback to localStorage if API fails
        setProfile({
          name: localStorage.getItem("userName") || "User",
          email: localStorage.getItem("userEmail") || "",
          registration_date: null,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSaveName = async () => {
    if (!newName.trim() || newName.trim().length < 2) {
      setNameMsg({ type: "error", text: "Name must be at least 2 characters." });
      return;
    }
    setSavingName(true);
    setNameMsg({ type: "", text: "" });
    try {
      const data = await updateProfile(newName.trim());
      if (data.user) {
        setProfile(prev => ({ ...prev, name: data.user.name }));
        localStorage.setItem("userName", data.user.name);
        setNameMsg({ type: "success", text: "Name updated successfully!" });
        setEditingName(false);
      } else {
        setNameMsg({ type: "error", text: data.error || "Update failed." });
      }
    } catch {
      setNameMsg({ type: "error", text: "Could not connect to server." });
    } finally {
      setSavingName(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwMsg({ type: "", text: "" });
    if (!currentPw || !newPw || !confirmPw) {
      setPwMsg({ type: "error", text: "Please fill in all password fields." });
      return;
    }
    if (newPw !== confirmPw) {
      setPwMsg({ type: "error", text: "New passwords do not match." });
      return;
    }
    if (newPw.length < 8) {
      setPwMsg({ type: "error", text: "New password must be at least 8 characters." });
      return;
    }
    setSavingPw(true);
    try {
      const data = await changePassword(currentPw, newPw);
      if (data.message) {
        setPwMsg({ type: "success", text: "Password changed successfully!" });
        setCurrentPw(""); setNewPw(""); setConfirmPw("");
      } else {
        setPwMsg({ type: "error", text: data.error || "Password change failed." });
      }
    } catch {
      setPwMsg({ type: "error", text: "Could not connect to server." });
    } finally {
      setSavingPw(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePw) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL || "http://127.0.0.1:5000/api"}/user/delete-account`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ password: deletePw }),
      });
      if (res.ok) {
        localStorage.clear();
        window.location.href = "/register";
      }
    } catch { /* silently fail */ }
  };

  // Format the member since date
  const memberSince = profile?.registration_date
    ? new Date(profile.registration_date).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : localStorage.getItem("userEmail") ? "Active member" : "—";

  // First letter of name for avatar
  const avatarLetter = profile?.name ? profile.name.charAt(0).toUpperCase() : "U";

  if (loading) {
    return (
      <>
        <style>{css}</style>
        <Navbar />
        <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 16, animation: "float 2s ease-in-out infinite" }}>🚀</div>
            <p style={{ color: "var(--soft)", fontSize: 15 }}>Loading your dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="page">

        {/* ── Hero ── */}
        <div className="dash-hero">
          <div className="dash-hero-inner">
            <div className="dash-welcome">
              <div className="dash-welcome-label">My Account</div>
              <div className="dash-welcome-title">
                Welcome back, {profile?.name?.split(" ")[0] || "there"} 👋
              </div>
              <div className="dash-welcome-sub">
                Member since {memberSince} · {profile?.email}
              </div>
            </div>
            <div className="dash-avatar">{avatarLetter}</div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="dash-stats">
          <div className="stat-card fade-up">
            <div className="stat-icon stat-icon-coral">💡</div>
            <div>
              <div className="stat-num">{stats.total_ideas}</div>
              <div className="stat-lbl">Ideas Submitted</div>
            </div>
          </div>
          <div className="stat-card fade-up delay-1">
            <div className="stat-icon stat-icon-indigo">📋</div>
            <div>
              <div className="stat-num">{stats.total_plans}</div>
              <div className="stat-lbl">MVP Plans Generated</div>
            </div>
          </div>
          <div className="stat-card fade-up delay-2">
            <div className="stat-icon stat-icon-teal">⚡</div>
            <div>
              <div className="stat-num">&lt;30s</div>
              <div className="stat-lbl">Avg. Generation Time</div>
            </div>
          </div>
        </div>

        {/* ── Body (2-col grid) ── */}
        <div className="dash-body">

          {/* LEFT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Profile Info */}
            <div className="dash-card fade-up">
              <div className="dash-card-title">👤 Profile Information</div>
              <div className="dash-card-sub">Manage your personal details</div>

              {nameMsg.text && (
                <div className={nameMsg.type === "success" ? "dash-success" : "dash-error"}>
                  {nameMsg.type === "success" ? "✅" : "⚠️"} {nameMsg.text}
                </div>
              )}

              {/* Name Row */}
              <div className="info-row">
                {editingName ? (
                  <div style={{ flex: 1 }}>
                    <div className="dash-label" style={{ marginBottom: 8, fontSize: 12, color: "var(--soft)", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>Full Name</div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <input
                        className="dash-input"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        placeholder="Your full name"
                        style={{ flex: 1 }}
                      />
                      <button className="dash-btn-ghost" onClick={() => { setEditingName(false); setNewName(profile?.name || ""); setNameMsg({ type: "", text: "" }); }}>
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveName}
                        disabled={savingName}
                        style={{ background: "var(--indigo)", color: "#fff", border: "none", borderRadius: 12, padding: "10px 18px", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer", opacity: savingName ? 0.6 : 1 }}
                      >
                        {savingName ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <div className="info-label">Full Name</div>
                      <div className="info-value">{profile?.name}</div>
                    </div>
                    <button className="info-edit-btn" onClick={() => setEditingName(true)}>Edit</button>
                  </>
                )}
              </div>

              {/* Email Row */}
              <div className="info-row">
                <div>
                  <div className="info-label">Email Address</div>
                  <div className="info-value">{profile?.email}</div>
                </div>
                <span style={{ fontSize: 12, color: "var(--soft)", background: "var(--bg)", padding: "4px 10px", borderRadius: 100, border: "1px solid var(--border)" }}>
                  Cannot change
                </span>
              </div>

              {/* Member Since Row */}
              <div className="info-row">
                <div>
                  <div className="info-label">Member Since</div>
                  <div className="info-value">{memberSince}</div>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="dash-card fade-up delay-1">
              <div className="dash-card-title">🔐 Change Password</div>
              <div className="dash-card-sub">Keep your account secure</div>

              {pwMsg.text && (
                <div className={pwMsg.type === "success" ? "dash-success" : "dash-error"}>
                  {pwMsg.type === "success" ? "✅" : "⚠️"} {pwMsg.text}
                </div>
              )}

              <form onSubmit={handleChangePassword}>
                <div className="dash-fg">
                  <label className="dash-label">Current Password</label>
                  <input type="password" className="dash-input" placeholder="Your current password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} />
                </div>
                <div className="dash-fg">
                  <label className="dash-label">New Password</label>
                  <input type="password" className="dash-input" placeholder="Min. 8 characters" value={newPw} onChange={e => setNewPw(e.target.value)} />
                </div>
                <div className="dash-fg">
                  <label className="dash-label">Confirm New Password</label>
                  <input type="password" className="dash-input" placeholder="Repeat new password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} />
                </div>
                <button className="dash-btn-primary" type="submit" disabled={savingPw}>
                  {savingPw ? "Updating..." : "Update Password →"}
                </button>
              </form>
            </div>

            {/* Danger Zone */}
            <div className="danger-card fade-up delay-2">
              <div className="danger-title">⚠️ Danger Zone</div>
              <div className="danger-sub">
                Deleting your account will permanently remove all your ideas, MVP plans, and data. This action cannot be undone.
              </div>
              {!showDelete ? (
                <button className="danger-btn" onClick={() => setShowDelete(true)}>
                  Delete My Account
                </button>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div className="dash-fg" style={{ marginBottom: 0 }}>
                    <label className="dash-label">Enter your password to confirm</label>
                    <input type="password" className="dash-input" placeholder="Your password" value={deletePw} onChange={e => setDeletePw(e.target.value)} />
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button className="danger-btn" onClick={handleDeleteAccount}>Yes, Delete Everything</button>
                    <button className="dash-btn-ghost" onClick={() => { setShowDelete(false); setDeletePw(""); }}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Quick Actions */}
            <div className="dash-card fade-up delay-1">
              <div className="dash-card-title">⚡ Quick Actions</div>
              <div className="dash-card-sub">Jump right back in</div>

              <Link to="/demo" className="quick-link">
                <div className="quick-link-left">
                  <div className="quick-link-icon" style={{ background: "rgba(255,107,107,0.12)" }}>🚀</div>
                  <div>
                    <div className="quick-link-title">Generate New MVP</div>
                    <div className="quick-link-sub">Submit a new startup idea</div>
                  </div>
                </div>
                <div className="quick-link-arrow">→</div>
              </Link>

              <Link to="/my-plans" className="quick-link">
                <div className="quick-link-left">
                  <div className="quick-link-icon" style={{ background: "rgba(91,95,239,0.1)" }}>📋</div>
                  <div>
                    <div className="quick-link-title">My MVP Plans</div>
                    <div className="quick-link-sub">View and export saved plans</div>
                  </div>
                </div>
                <div className="quick-link-arrow">→</div>
              </Link>

              <Link to="/features" className="quick-link">
                <div className="quick-link-left">
                  <div className="quick-link-icon" style={{ background: "rgba(0,201,167,0.1)" }}>✨</div>
                  <div>
                    <div className="quick-link-title">Explore Features</div>
                    <div className="quick-link-sub">See what the platform can do</div>
                  </div>
                </div>
                <div className="quick-link-arrow">→</div>
              </Link>
            </div>

            {/* Account Summary */}
            <div className="dash-card fade-up delay-2">
              <div className="dash-card-title">📊 Activity Summary</div>
              <div className="dash-card-sub">Your usage at a glance</div>

              {[
                { label: "Total Ideas", value: stats.total_ideas, max: 10, color: "var(--coral)" },
                { label: "Plans Generated", value: stats.total_plans, max: 10, color: "var(--indigo)" },
              ].map(({ label, value, max, color }) => (
                <div key={label} style={{ marginBottom: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
                    <span style={{ fontSize: 13, color: "var(--soft)" }}>{value}</span>
                  </div>
                  <div style={{ height: 8, background: "var(--border)", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 99,
                      width: `${Math.min((value / Math.max(max, value || 1)) * 100, 100)}%`,
                      background: color, transition: "width 1s ease"
                    }} />
                  </div>
                </div>
              ))}

              {stats.total_plans === 0 && (
                <div style={{ textAlign: "center", padding: "20px 0", color: "var(--soft)", fontSize: 14 }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>💡</div>
                  No plans yet —{" "}
                  <Link to="/demo" style={{ color: "var(--indigo)", fontWeight: 600, textDecoration: "none" }}>
                    generate your first MVP!
                  </Link>
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
