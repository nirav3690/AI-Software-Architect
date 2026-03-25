import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    window.location.href = "/register";
  };

  return (
    <nav className="nav">
      <Link to="/" className="logo">
        <div className="logo-icon">🚀</div>
        IdeaToMVP
      </Link>

      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/how-it-works" className={({ isActive }) => isActive ? "active" : ""}>How it Works</NavLink>
        <NavLink to="/features" className={({ isActive }) => isActive ? "active" : ""}>Features</NavLink>
        <NavLink to="/demo" className={({ isActive }) => isActive ? "active" : ""}>Try it Free</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink>
      </div>

      {isAuthenticated ? (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {userName && (
            <span style={{ fontSize: "14px", color: "var(--soft)", fontWeight: "500" }}>
              Hi, {userName}
            </span>
          )}
          <button onClick={handleLogout} className="nav-btn" style={{ background: "var(--coral)" }}>
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login" className="nav-btn">Get Started →</Link>
      )}
    </nav>
  );
}
