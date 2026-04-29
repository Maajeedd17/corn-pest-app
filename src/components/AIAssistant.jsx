import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu, Info, CheckCircle, AlertTriangle, ChevronRight,
  X, Download, FileText, Bug, AlertCircle, Shield
} from "lucide-react";

function Skeleton({ h = 14, w = "100%", mb = 8 }) {
  return <div className="skeleton" style={{ height: h, width: w, marginBottom: mb, borderRadius: 6 }} />;
}

function Block({ icon: Icon, iconColor, bgColor, borderColor, title, titleColor, children }) {
  return (
    <div style={{ background: bgColor, border: `1px solid ${borderColor}`, borderRadius: 14, padding: "14px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <Icon size={14} color={iconColor} />
        <span style={{ fontSize: 11.5, fontWeight: 700, color: titleColor, textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: "var(--font-display)" }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function ReportModal({ result, onClose }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const sevColor = result.severity === "high" ? "#f87171" : result.severity === "medium" ? "#fbbf24" : "#6ee7b7";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "100%", maxWidth: 680,
          background: "#0c1520",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 24,
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          maxHeight: "90vh", overflowY: "auto",
        }}
      >
        <style>{`
          .rm-header { padding: 24px 28px 20px; border-bottom: 1px solid rgba(255,255,255,0.08); background: linear-gradient(135deg, rgba(16,185,129,0.06) 0%, transparent 60%); display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
          .rm-eyebrow { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 99px; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2); font-size: 10.5px; font-weight: 600; color: #6ee7b7; text-transform: uppercase; letter-spacing: 0.08em; font-family: var(--font-display); margin-bottom: 10px; }
          .rm-title { font-family: var(--font-display); font-size: 20px; font-weight: 800; color: #f1f5f9; letter-spacing: -0.02em; }
          .rm-subtitle { font-size: 12.5px; color: #475569; margin-top: 4px; }
          .rm-close { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: #64748b; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.15s, color 0.15s; flex-shrink: 0; }
          .rm-close:hover { background: rgba(255,255,255,0.1); color: #f1f5f9; }
          .rm-body { padding: 24px 28px; display: flex; flex-direction: column; gap: 20px; }
          .rm-meta-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
          .rm-meta-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 12px 14px; }
          .rm-meta-label { font-size: 10.5px; color: #475569; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; font-family: var(--font-display); margin-bottom: 5px; }
          .rm-meta-value { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: #e2e8f0; }
          .rm-section-title { font-family: var(--font-display); font-size: 11px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.1em; display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
          .rm-section-title::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
          .rm-text { font-size: 13.5px; color: #94a3b8; line-height: 1.75; }
          .rm-prob-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
          .rm-prob-name { font-size: 12.5px; color: #94a3b8; width: 130px; flex-shrink: 0; }
          .rm-prob-track { flex: 1; height: 7px; background: rgba(255,255,255,0.05); border-radius: 99px; overflow: hidden; }
          .rm-prob-fill { height: 100%; border-radius: 99px; }
          .rm-prob-val { font-size: 12px; font-family: var(--font-mono); font-weight: 600; width: 52px; text-align: right; }
          .rm-footer { padding: 16px 28px; border-top: 1px solid rgba(255,255,255,0.07); display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
          .rm-footer-note { font-size: 11px; color: #334155; font-family: var(--font-mono); }
          .rm-actions { display: flex; gap: 8px; }
          @media (max-width: 500px) { .rm-meta-grid { grid-template-columns: 1fr 1fr; } }
        `}</style>

        {/* Header */}
        <div className="rm-header">
          <div>
            <div className="rm-eyebrow"><FileText size={10} /> Diagnostic Report</div>
            <div className="rm-title">Pest Detection Report</div>
            <div className="rm-subtitle">{dateStr} · {timeStr} · CornGuard AI v2.1</div>
          </div>
          <button className="rm-close" onClick={onClose}><X size={15} /></button>
        </div>

        <div className="rm-body">
          {/* Summary */}
          <div>
            <div className="rm-section-title"><Shield size={11} /> Detection Summary</div>
            <div className="rm-meta-grid">
              {[
                { label: "Detected Pest", value: result.pest, color: result.color },
                { label: "Confidence",    value: `${result.confidence.toFixed(1)}%` },
                { label: "Severity",      value: result.severityLabel, color: sevColor },
                { label: "Date",          value: dateStr, small: true },
                { label: "Model",         value: "CornGuard v2.1", small: true },
                { label: "Status",        value: "Completed", color: "#6ee7b7", small: true },
              ].map(m => (
                <div key={m.label} className="rm-meta-card">
                  <div className="rm-meta-label">{m.label}</div>
                  <div className="rm-meta-value" style={{ color: m.color || "#e2e8f0", fontSize: m.small ? 12 : 14 }}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="rm-section-title"><Bug size={11} /> Pest Description</div>
            <div style={{ background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.12)", borderRadius: 14, padding: "16px 18px" }}>
              <p className="rm-text">{result.description}</p>
            </div>
          </div>

          {/* Recommendation */}
          <div>
            <div className="rm-section-title"><CheckCircle size={11} /> Treatment Recommendation</div>
            <div style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.12)", borderRadius: 14, padding: "16px 18px" }}>
              <p className="rm-text">{result.recommendation}</p>
            </div>
          </div>

          {/* Probabilities */}
          <div>
            <div className="rm-section-title"><Info size={11} /> Class Probability Breakdown</div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "16px 18px" }}>
              {result.probabilities.map(p => (
                <div key={p.name} className="rm-prob-row">
                  <span className="rm-prob-name">{p.name}</span>
                  <div className="rm-prob-track">
                    <div className="rm-prob-fill" style={{ width: `${p.value}%`, background: p.color }} />
                  </div>
                  <span className="rm-prob-val" style={{ color: p.color }}>{p.value.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Warning */}
          <div>
            <div className="rm-section-title"><AlertCircle size={11} /> {result.severity === "high" ? "Critical Warning" : "Advisory Note"}</div>
            <div style={{
              background: result.severity === "high" ? "rgba(239,68,68,0.06)" : result.severity === "medium" ? "rgba(245,158,11,0.06)" : "rgba(16,185,129,0.05)",
              border: `1px solid ${result.severity === "high" ? "rgba(239,68,68,0.2)" : result.severity === "medium" ? "rgba(245,158,11,0.2)" : "rgba(16,185,129,0.15)"}`,
              borderRadius: 14, padding: "16px 18px", display: "flex", gap: 12, alignItems: "flex-start"
            }}>
              <AlertTriangle size={16} color={sevColor} style={{ flexShrink: 0, marginTop: 2 }} />
              <p className="rm-text">{result.warning}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="rm-footer">
          <span className="rm-footer-note">Generated by CornGuard AI · {dateStr}</span>
          <div className="rm-actions">
            <button className="btn-secondary" style={{ fontSize: 12, padding: "8px 14px" }} onClick={() => window.print()}>
              <Download size={13} /> Save / Print
            </button>
            <button className="btn-primary" style={{ fontSize: 12, padding: "8px 18px" }} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AIAssistant({ result, analyzing }) {
  const [showReport, setShowReport] = useState(false);

  return (
    <>
      <div className="glass" style={{ padding: 24 }}>
        <style>{`
          .ai-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
          .ai-title { font-family: var(--font-display); font-weight: 700; font-size: 14px; color: #e2e8f0; display: flex; align-items: center; gap: 8px; }
          .ai-title svg { color: #10b981; }
          .ai-version-tag { font-size: 10.5px; font-family: var(--font-mono); color: #334155; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); padding: 3px 9px; border-radius: 6px; }
          .ai-blocks { display: flex; flex-direction: column; gap: 12px; }
          .block-text { font-size: 13px; color: #94a3b8; line-height: 1.75; }
        `}</style>

        <div className="ai-head">
          <div className="ai-title"><Cpu size={15} />AI Decision Support</div>
          <div className="ai-version-tag">GPT-Agri v2.1</div>
        </div>

        {analyzing ? (
          <div className="ai-blocks">
            {[1,2,3].map(i => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "14px 16px" }}>
                <Skeleton h={11} w="40%" mb={12} /><Skeleton h={13} mb={6} /><Skeleton h={13} mb={6} /><Skeleton h={13} w="75%" mb={0} />
              </div>
            ))}
          </div>
        ) : result ? (
          <motion.div className="ai-blocks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <Block icon={Info} iconColor="#60a5fa" bgColor="rgba(59,130,246,0.06)" borderColor="rgba(59,130,246,0.15)" title="Pest Description" titleColor="#93c5fd">
              <p className="block-text">{result.description}</p>
            </Block>
            <Block icon={CheckCircle} iconColor="#10b981" bgColor="rgba(16,185,129,0.06)" borderColor="rgba(16,185,129,0.15)" title="Treatment Recommendation" titleColor="#6ee7b7">
              <p className="block-text">{result.recommendation}</p>
            </Block>
            <Block
              icon={AlertTriangle}
              iconColor={result.severity==="high"?"#f87171":result.severity==="medium"?"#fbbf24":"#6ee7b7"}
              bgColor={result.severity==="high"?"rgba(239,68,68,0.06)":result.severity==="medium"?"rgba(245,158,11,0.06)":"rgba(16,185,129,0.04)"}
              borderColor={result.severity==="high"?"rgba(239,68,68,0.2)":result.severity==="medium"?"rgba(245,158,11,0.2)":"rgba(16,185,129,0.15)"}
              title={result.severity==="high"?"Critical Warning":"Advisory Note"}
              titleColor={result.severity==="high"?"#fca5a5":result.severity==="medium"?"#fde68a":"#6ee7b7"}
            >
              <p className="block-text">{result.warning}</p>
            </Block>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className="btn-secondary" style={{ fontSize: 12, padding: "8px 14px" }} onClick={() => setShowReport(true)}>
                Full Report <ChevronRight size={12} />
              </button>
            </div>
          </motion.div>
        ) : null}
      </div>

      <AnimatePresence>
        {showReport && result && <ReportModal result={result} onClose={() => setShowReport(false)} />}
      </AnimatePresence>
    </>
  );
}
