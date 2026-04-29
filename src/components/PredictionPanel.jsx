import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, TrendingUp } from "lucide-react";


const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ConfidenceRing({ value, color, animating }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (animating) { setDisplayed(0); return; }
    const timeout = setTimeout(() => setDisplayed(value), 200);
    return () => clearTimeout(timeout);
  }, [value, animating]);

  const offset = CIRCUMFERENCE - (displayed / 100) * CIRCUMFERENCE;

  return (
    <div style={{ position: "relative", width: 140, height: 140 }}>
      <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
        {/* Track */}
        <circle cx="70" cy="70" r={RADIUS} className="ring-track" strokeWidth="8" />
        {/* Glow circle underneath */}
        <circle
          cx="70" cy="70" r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeOpacity="0.1"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE - (displayed / 100) * CIRCUMFERENCE}
          style={{ filter: "blur(6px)", transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)" }}
        />
        {/* Main fill */}
        <circle
          cx="70" cy="70" r={RADIUS}
          className="ring-fill"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
      </svg>
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}>
        {animating ? (
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.1)",
            borderTopColor: color,
            animation: "spin 0.9s linear infinite"
          }} />
        ) : (
          <>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color: "#f1f5f9", lineHeight: 1 }}>
              {displayed.toFixed(1)}%
            </span>
            <span style={{ fontSize: 10, color: "#475569", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-display)", fontWeight: 600 }}>
              confidence
            </span>
          </>
        )}
      </div>
    </div>
  );
}

function Skeleton({ h = 16, w = "100%", mb = 10 }) {
  return <div className="skeleton" style={{ height: h, width: w, marginBottom: mb, borderRadius: 8 }} />;
}

const SEVERITY_MAP = {
  none: { label: "No Threat", cls: "badge-none", glow: "rgba(16,185,129,0.15)" },
  medium: { label: "Moderate", cls: "badge-medium", glow: "rgba(245,158,11,0.15)" },
  high: { label: "Critical", cls: "badge-high", glow: "rgba(239,68,68,0.15)" },
};

export default function PredictionPanel({ result, analyzing }) {
  const sev = result ? SEVERITY_MAP[result.severity] : null;

  return (
    <div className="glass" style={{ padding: 24 }}>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .pred-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .pred-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 14px;
          color: #e2e8f0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pred-title svg { color: #10b981; }
        .pred-body {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .pred-ring-col { flex-shrink: 0; }
        .pred-info-col { flex: 1; }
        .pred-class-name {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 800;
          color: #f1f5f9;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 10px;
        }
        .pred-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 16px 0;
        }
        .pred-meta-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .pred-meta-card {
          flex: 1;
          min-width: 80px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 10px 12px;
        }
        .pred-meta-label { font-size: 10px; color: #475569; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; font-family: var(--font-display); margin-bottom: 4px; }
        .pred-meta-value { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: #e2e8f0; }

        @media (max-width: 500px) {
          .pred-body { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="pred-head">
        <div className="pred-title">
          <Activity size={15} />
          Prediction
        </div>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`badge ${sev.cls}`}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", opacity: 0.8 }} />
              {sev.label}
            </div>
          </motion.div>
        )}
      </div>

      <div className="pred-body">
        <div className="pred-ring-col">
          <ConfidenceRing
            value={result?.confidence || 0}
            color={result?.color || "#10b981"}
            animating={analyzing}
          />
        </div>

        <div className="pred-info-col">
          {analyzing ? (
            <>
              <Skeleton h={28} mb={12} />
              <Skeleton h={22} w="60%" mb={0} />
            </>
          ) : result ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="pred-class-name" style={{ color: result.color }}>
                {result.pest}
              </div>
              <div style={{ fontSize: 12, color: "#475569", fontFamily: "var(--font-mono)", marginBottom: 6 }}>
                Detected with {result.confidence.toFixed(1)}% confidence
              </div>
            </motion.div>
          ) : null}

          <div className="pred-divider" />

          <div className="pred-meta-row">
            {analyzing ? (
              <>
                <div className="pred-meta-card"><Skeleton h={12} mb={4} w="60%" /><Skeleton h={16} mb={0} w="80%" /></div>
                <div className="pred-meta-card"><Skeleton h={12} mb={4} w="60%" /><Skeleton h={16} mb={0} w="80%" /></div>
              </>
            ) : result ? (
              <>
                <div className="pred-meta-card">
                  <div className="pred-meta-label">Top Score</div>
                  <div className="pred-meta-value">{result.probabilities[0].value.toFixed(1)}%</div>
                </div>
                <div className="pred-meta-card">
                  <div className="pred-meta-label">Severity</div>
                  <div className="pred-meta-value" style={{ color: sev.cls === "badge-high" ? "#f87171" : sev.cls === "badge-medium" ? "#fbbf24" : "#6ee7b7" }}>
                    {sev.label}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}