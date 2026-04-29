import { motion, AnimatePresence } from "framer-motion";
import { X, Cpu, Target, Database, Zap, Sun, Crosshair, Droplets, Thermometer, Leaf, BookOpen, Shield } from "lucide-react";
import { PEST_CLASSES, SYSTEM_STATS, GUIDELINES } from "../data/mockData";

export default function Sidebar({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          className="sidebar"
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          exit={{ x: -320 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <style>{`
            .sb-head {
              padding: 20px;
              border-bottom: 1px solid rgba(255,255,255,0.07);
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .sb-logo {
              display: flex;
              align-items: center;
              gap: 10px;
            }
            .sb-logo-mark {
              width: 32px;
              height: 32px;
              background: linear-gradient(135deg, #10b981, #059669);
              border-radius: 9px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 16px rgba(16,185,129,0.25);
            }
            .sb-title { font-family: var(--font-display); font-weight: 700; font-size: 14px; color: #f1f5f9; }
            .sb-sub { font-size: 10px; color: #10b981; text-transform: uppercase; letter-spacing: 0.06em; }
            .sb-close {
              background: none;
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 8px;
              color: #64748b;
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: background 0.15s;
            }
            .sb-close:hover { background: rgba(255,255,255,0.06); color: #f1f5f9; }
            .sb-body {
              flex: 1;
              overflow-y: auto;
              padding: 20px;
              display: flex;
              flex-direction: column;
              gap: 28px;
            }
            .sb-section-title {
              font-family: var(--font-display);
              font-size: 10px;
              font-weight: 700;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              color: #334155;
              margin-bottom: 12px;
            }
            .sb-stat-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 9px 12px;
              border-radius: 10px;
              transition: background 0.15s;
            }
            .sb-stat-row:hover { background: rgba(255,255,255,0.04); }
            .sb-stat-key { font-size: 12px; color: #64748b; font-weight: 500; }
            .sb-stat-val { font-size: 12px; color: #cbd5e1; font-family: var(--font-mono); font-weight: 500; }
            .sb-class-item {
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 8px 10px;
              border-radius: 10px;
              transition: background 0.15s;
            }
            .sb-class-item:hover { background: rgba(255,255,255,0.04); }
            .sb-class-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
            .sb-class-label { font-size: 12.5px; color: #94a3b8; }
            .sb-class-emoji { font-size: 13px; }
            .sb-guide-item {
              display: flex;
              align-items: flex-start;
              gap: 10px;
              padding: 8px 4px;
            }
            .sb-guide-icon { color: #10b981; margin-top: 1px; flex-shrink: 0; }
            .sb-guide-text { font-size: 12px; color: #64748b; line-height: 1.6; }
            .sb-foot {
              padding: 16px 20px;
              border-top: 1px solid rgba(255,255,255,0.07);
            }
            .sb-foot-card {
              background: rgba(16,185,129,0.07);
              border: 1px solid rgba(16,185,129,0.15);
              border-radius: 12px;
              padding: 14px 16px;
            }
            .sb-foot-label { font-size: 11px; font-weight: 600; color: #6ee7b7; font-family: var(--font-display); margin-bottom: 4px; }
            .sb-foot-sub { font-size: 11px; color: #334155; }
          `}</style>

          <div className="sb-head">
            <div className="sb-logo">
              <div className="sb-logo-mark">
                <Leaf size={15} color="#fff" />
              </div>
              <div>
                <div className="sb-title">CornGuard AI</div>
                <div className="sb-sub">v2.1 · Production</div>
              </div>
            </div>
            <button className="sb-close" onClick={onClose}><X size={14} /></button>
          </div>

          <div className="sb-body">
            {/* System Stats */}
            <div>
              <div className="sb-section-title">
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Cpu size={10} /> System Overview</span>
              </div>
              {SYSTEM_STATS.map(s => (
                <div key={s.label} className="sb-stat-row">
                  <span className="sb-stat-key">{s.label}</span>
                  <span className="sb-stat-val">{s.value}</span>
                </div>
              ))}
            </div>

            {/* Pest Classes */}
            <div>
              <div className="sb-section-title">
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Shield size={10} /> Detectable Classes</span>
              </div>
              {PEST_CLASSES.map(c => (
                <div key={c.id} className="sb-class-item">
                  <div className="sb-class-dot" style={{ background: c.color }} />
                  <span className="sb-class-emoji">{c.emoji}</span>
                  <span className="sb-class-label">{c.label}</span>
                </div>
              ))}
            </div>

            {/* Guidelines */}
            <div>
              <div className="sb-section-title">
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}><BookOpen size={10} /> Capture Guidelines</span>
              </div>
              {GUIDELINES.map((g, i) => (
                <div key={i} className="sb-guide-item">
                  <Sun size={12} className="sb-guide-icon" />
                  <span className="sb-guide-text">{g.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sb-foot">
            <div className="sb-foot-card">
              <div className="sb-foot-label">Final Year Project · 2025</div>
              <div className="sb-foot-sub">Computer Engineering Department</div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
