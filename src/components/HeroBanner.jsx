import { motion } from "framer-motion";
import { Menu, Wifi, Leaf, ChevronRight } from "lucide-react";

const stats = [
  { label: "Model", value: "EfficientNetB0", accent: false },
  { label: "Accuracy", value: "97.2%", accent: true },
  { label: "Classes", value: "4 Pests", accent: false },
  
];

export default function HeroBanner({ onMenuClick }) {
  return (
    <header className="hero-header">
      <style>{`
        .hero-header {
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 0 24px;
        }

        .hero-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0 12px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .hero-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-mark {
          width: 34px;
          height: 34px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(16,185,129,0.3);
          flex-shrink: 0;
        }

        .logo-name {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 15px;
          color: #f1f5f9;
          letter-spacing: -0.01em;
        }

        .logo-sub {
          font-size: 10.5px;
          color: #10b981;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .status-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 99px;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.2);
          font-size: 11.5px;
          font-weight: 500;
          color: #6ee7b7;
          font-family: var(--font-display);
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          animation: pulse-dot 2s infinite;
        }

        .menu-btn {
          background: none;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #94a3b8;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }

        .menu-btn:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.18);
        }

        .hero-body {
          max-width: 1440px;
          margin: 0 auto;
          padding: 48px 0 40px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 40px;
          align-items: center;
        }

        @media (max-width: 900px) {
          .hero-body { grid-template-columns: 1fr; }
          .hero-stats { display: none; }
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          border-radius: 99px;
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.18);
          font-size: 11.5px;
          font-weight: 600;
          color: #6ee7b7;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-family: var(--font-display);
          margin-bottom: 20px;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 16px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #f1f5f9 0%, #a7f3d0 40%, #10b981 80%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-desc {
          font-size: 15px;
          color: #64748b;
          line-height: 1.7;
          max-width: 540px;
          margin-bottom: 28px;
        }

        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .hero-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #475569;
          font-family: var(--font-mono);
        }

        .hero-pill-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #475569;
        }

        .hero-stats {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 200px;
        }

        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          transition: background 0.2s, border-color 0.2s;
        }

        .stat-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.14);
        }

        .stat-card.accent {
          background: rgba(16,185,129,0.06);
          border-color: rgba(16,185,129,0.2);
        }

        .stat-label {
          font-size: 11px;
          color: #475569;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-family: var(--font-display);
        }

        .stat-value {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 14px;
          color: #f1f5f9;
        }

        .stat-value.accent { color: #6ee7b7; }

        .hero-glow {
          position: absolute;
          top: -60px;
          right: -60px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
      `}</style>

      <div className="hero-glow" />

      <div className="hero-nav">
        <div className="hero-logo">
          <button className="menu-btn" onClick={onMenuClick} aria-label="Open sidebar">
            <Menu size={16} />
          </button>
          <div className="logo-mark">
            <Leaf size={16} color="#fff" />
          </div>
          <div>
            <div className="logo-name">CornGuard AI</div>
            <div className="logo-sub">Smart Agriculture Platform</div>
          </div>
        </div>
        <div className="nav-right">
          <div className="status-pill">
            <div className="status-dot" />
            Model Online
          </div>
        </div>
      </div>

      <div className="hero-body">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-eyebrow">
            <Wifi size={11} />
            AI-Powered Detection System
          </div>

          <h1 className="hero-title">
            <span className="gradient-text">Corn Pest Detection</span>
            <br />
            <span style={{ color: "#565e6a" }}>&amp; Decision Support</span>
          </h1>

          <p className="hero-desc">
            Upload crop images for instant AI-powered pest identification, severity assessment, and precision treatment recommendations. Powered by deep learning  across 4 pest categories.
          </p>

          <div className="hero-cta-row">
            <div className="hero-pill">
              <div className="hero-pill-dot" />
              PyTorch 2.x
            </div>
            <div className="hero-pill">
              <div className="hero-pill-dot" />
              EfficientNetB0
            </div>
            
            <div className="hero-pill">
              <div className="hero-pill-dot" />
              Grad-CAM XAI
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className={`stat-card ${s.accent ? "accent" : ""}`}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="stat-label">{s.label}</span>
              <span className={`stat-value ${s.accent ? "accent" : ""}`}>{s.value}</span>
            </motion.div>
          ))}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, paddingRight: 4 }}>
            <span style={{ fontSize: 11, color: "#334155", fontFamily: "var(--font-mono)" }}>
               2026
            </span>
            <ChevronRight size={11} color="#334155" />
          </div>
        </motion.div>
      </div>
    </header>
  );
}
