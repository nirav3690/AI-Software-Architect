import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand-name">
            <div className="footer-brand-icon">🚀</div>
            IdeaToMVP
          </div>
          <div className="footer-brand-desc">
            AI Software Architect that turns your startup concept into a complete, developer-ready MVP blueprint.
          </div>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Pages</div>
          <Link to="/">Home</Link>
          <Link to="/how-it-works">How it Works</Link>
          <Link to="/features">Features</Link>
          <Link to="/demo">Try it Free</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Team</div>
          <a href="#">Akshay Purohit</a>
          <a href="#">Nirav Kachhiya</a>
          <a href="#">Achyut Pathak</a>
          <a href="#">Monar Dudhat</a>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Tech Stack</div>
          <a href="#">React.js Frontend</a>
          <a href="#">Flask + Python</a>
          <a href="#">Gemini AI API</a>
          <a href="#">PostgreSQL</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 IdeaToMVP · MSCIT Project</span>
        <div className="team-ids">
          {["202512011","202512033","202512039","202512019"].map(id => (
            <span key={id} className="team-id">{id}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
