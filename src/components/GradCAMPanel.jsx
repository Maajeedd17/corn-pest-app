import { motion } from "framer-motion";
import { Eye, Layers, Cpu, ExternalLink } from "lucide-react";

const PANELS = [
  {
    key: "original",
    label: "Original Image",
    icon: Eye,
    desc: "Raw input image as uploaded by the user",
    accent: "#94a3b8",
    overlay: null,
  },
  {
    key: "heatmap",
    label: "Activation Heatmap",
    icon: Cpu,
    desc: "Gradient-weighted class activation map",
    accent: "#f97316",
    overlay: "heatmap",
  },
  {
    key: "overlay",
    label: "Grad-CAM Overlay",
    icon: Layers,
    desc: "Heatmap superimposed on original image",
    accent: "#10b981",
    overlay: "overlay",
  },
];

function HeatmapPlaceholder() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="hm1" cx="60%" cy="40%" r="40%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#f97316" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hm2" cx="30%" cy="65%" r="25%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill="#0f172a" />
      <rect width="200" height="200" fill="url(#hm1)" />
      <rect width="200" height="200" fill="url(#hm2)" />
    </svg>
  );
}

function OverlayPlaceholder({ image }) {
  return (
    <>
      {image ? (
        <img src={image} alt="overlay base" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <div style={{ position: "absolute", inset: 0, background: "#0f172a" }} />
      )}
      <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="ov1" cx="60%" cy="40%" r="40%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
            <stop offset="40%" stopColor="#f97316" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill="url(#ov1)" />
      </svg>
    </>
  );
}

export default function GradCAMPanel({ image, result }) {
  return (
    <div className="glass" style={{ padding: 24 }}>
      <style>{`
        .gradcam-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 14px;
          color: #e2e8f0;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }
        .gradcam-title svg { color: #10b981; }
        .gradcam-sub {
          font-size: 12.5px;
          color: #475569;
          margin-bottom: 20px;
          line-height: 1.6;
        }
        .gradcam-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 600px) {
          .gradcam-grid { grid-template-columns: 1fr; }
        }
        .gradcam-panel {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .gradcam-img-box {
          position: relative;
          border-radius: 14px;
          aspect-ratio: 1;
          overflow: hidden;
          cursor: zoom-in;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
        }
        .gradcam-img-box img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          display: block;
        }
        .gradcam-img-box:hover img { transform: scale(1.07); }
        .gradcam-img-box:hover .gradcam-zoom-hint { opacity: 1; }
        .gradcam-zoom-hint {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          padding: 4px 8px;
          font-size: 10px;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 5px;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }
        .gradcam-panel-label {
          font-family: var(--font-display);
          font-size: 12.5px;
          font-weight: 700;
          color: #e2e8f0;
        }
        .gradcam-panel-desc {
          font-size: 11.5px;
          color: #475569;
          line-height: 1.55;
        }
        .gradcam-accent-bar {
          height: 2px;
          border-radius: 1px;
          width: 28px;
          margin-bottom: 6px;
        }
        .gradcam-connect-note {
          margin-top: 20px;
          padding: 14px 16px;
          background: rgba(16,185,129,0.05);
          border: 1px solid rgba(16,185,129,0.12);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .gradcam-note-text { font-size: 12.5px; color: #475569; line-height: 1.6; }
        .gradcam-note-text strong { color: #6ee7b7; font-weight: 600; }
        .gradcam-xai-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(167,139,250,0.08);
          border: 1px solid rgba(167,139,250,0.2);
          border-radius: 99px;
          font-size: 11.5px;
          font-weight: 600;
          color: #c4b5fd;
          font-family: var(--font-display);
          white-space: nowrap;
        }
      `}</style>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 0, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div className="gradcam-title">
            <Eye size={15} />
            Explainable AI · Grad-CAM
          </div>
          <div className="gradcam-sub">
            Visualizes which regions of the image influenced the model's decision most. 
          </div>
        </div>
        <div className="gradcam-xai-badge">
          <Layers size={12} />
          XAI Module
        </div>
      </div>

      <div className="gradcam-grid">
        {PANELS.map((panel, i) => (
          <motion.div
            key={panel.key}
            className="gradcam-panel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="gradcam-img-box">
              {panel.overlay === null && (
                <>
                  {image ? (
                    <img src={image} alt="original" />
                  ) : (
                    <div style={{
                      position: "absolute", inset: 0,
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      background: "rgba(255,255,255,0.02)"
                    }}>
                      <panel.icon size={28} color="rgba(255,255,255,0.1)" />
                    </div>
                  )}
                </>
              )}

              {panel.overlay === "heatmap" && (
                result ? (
                  // If backend sent a real heatmap image, show it; otherwise SVG placeholder
                  result.gradcamHeatmap
                    ? <img src={`data:image/png;base64,${result.gradcamHeatmap}`} alt="heatmap" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                    : <HeatmapPlaceholder />
                ) : (
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <panel.icon size={28} color="rgba(255,255,255,0.1)" />
                  </div>
                )
              )}

              {panel.overlay === "overlay" && (
                result ? (
                  // If backend sent a real overlay image, show it; otherwise SVG placeholder
                  result.gradcamOverlay
                    ? <img src={`data:image/png;base64,${result.gradcamOverlay}`} alt="grad-cam overlay" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                    : <OverlayPlaceholder image={image} />
                ) : (
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <panel.icon size={28} color="rgba(255,255,255,0.1)" />
                  </div>
                )
              )}

              <div className="gradcam-zoom-hint">
                <ExternalLink size={9} /> Zoom
              </div>

              {/* Bottom label overlay */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "20px 12px 10px",
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                pointerEvents: "none",
              }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  {panel.label}
                </div>
              </div>
            </div>

            <div>
              <div className="gradcam-accent-bar" style={{ background: panel.accent }} />
              <div className="gradcam-panel-label">{panel.label}</div>
              <div className="gradcam-panel-desc">{panel.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="gradcam-connect-note">
        <div className="gradcam-note-text">
          <strong>Grad-CAM</strong> (Gradient-weighted Class Activation Mapping) highlights regions most influential to the model's decision.

        </div>
      </div>
    </div>
  );
}
