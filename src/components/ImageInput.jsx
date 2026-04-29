import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, X, Zap, RefreshCw, ImageIcon } from "lucide-react";
import { SAMPLES } from "../data/mockData";

export default function ImageInput({ image, sampleKey, onImage, onReset, onAnalyze, analyzing, hasResult }) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(null);
  const fileRef = useRef();

  const processFile = useCallback((file) => {
    setError(null);
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Only image files are supported (PNG, JPG, WEBP).");
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      setError("Image must be under 12MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = e => onImage(e.target.result, null);
    reader.readAsDataURL(file);
  }, [onImage]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  }, [processFile]);

  const handleDragOver = useCallback((e) => { e.preventDefault(); setDragging(true); }, []);
  const handleDragLeave = useCallback(() => setDragging(false), []);

  const hasInput = image || sampleKey;

  return (
    <div className="glass" style={{ padding: 24 }}>
      <style>{`
        .img-section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .img-section-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 14px;
          color: #e2e8f0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .img-section-title svg { color: #10b981; }
        .reset-btn {
          background: none;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: #ef4444;
          padding: 5px 12px;
          font-size: 11.5px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-display);
          transition: background 0.15s, border-color 0.15s;
        }
        .reset-btn:hover { background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.3); }

        .drop-zone-inner {
          min-height: 220px;
          border-radius: 14px;
          border: 1.5px dashed rgba(255,255,255,0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          padding: 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .drop-zone-inner:hover,
        .drop-zone-inner.drag-over {
          border-color: rgba(16,185,129,0.4);
          background: rgba(16,185,129,0.03);
        }
        .dz-icon {
          width: 52px;
          height: 52px;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }
        .dz-title { font-family: var(--font-display); font-size: 14px; font-weight: 600; color: #e2e8f0; }
        .dz-sub { font-size: 12px; color: #475569; }
        .dz-browse { color: #10b981; text-decoration: underline; text-decoration-style: dotted; cursor: pointer; }

        .preview-wrap {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          background: rgba(0,0,0,0.3);
        }
        .preview-img {
          width: 100%;
          max-height: 260px;
          object-fit: cover;
          display: block;
          border-radius: 14px;
        }
        .preview-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%);
          border-radius: 14px;
          pointer-events: none;
        }
        .preview-badge {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          padding: 5px 10px;
          font-size: 11px;
          color: #94a3b8;
          font-family: var(--font-mono);
        }

        .sample-label {
          font-size: 11px;
          color: #475569;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: var(--font-display);
          margin: 16px 0 10px;
        }
        .samples-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .sample-btn {
          flex: 1;
          min-width: 0;
          padding: 9px 12px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 500;
          font-family: var(--font-display);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.18s ease;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: #94a3b8;
          white-space: nowrap;
        }
        .sample-btn:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.16); color: #e2e8f0; transform: translateY(-1px); }
        .sample-btn.active { border-color: rgba(16,185,129,0.4); background: rgba(16,185,129,0.1); color: #6ee7b7; }

        .action-row {
          display: flex;
          gap: 10px;
          margin-top: 18px;
        }

        .error-msg {
          font-size: 12px;
          color: #f87171;
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 8px;
        }

        .sample-placeholder {
          min-height: 200px;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .sample-emoji { font-size: 52px; line-height: 1; }
        .sample-name { font-family: var(--font-display); font-size: 15px; font-weight: 600; color: #e2e8f0; }
        .sample-tag { font-size: 11px; color: #10b981; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2); padding: 3px 10px; border-radius: 99px; font-family: var(--font-display); font-weight: 500; }
      `}</style>

      {/* Header */}
      <div className="img-section-head">
        <div className="img-section-title">
          <ImageIcon size={15} />
          Image Input
        </div>
        {hasInput && (
          <button className="reset-btn" onClick={onReset}>
            <X size={11} /> Reset
          </button>
        )}
      </div>

      {/* Drop Zone / Preview */}
      <AnimatePresence mode="wait">
        {image ? (
          <motion.div
            key="preview"
            className="preview-wrap"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={image} alt="Uploaded crop" className="preview-img" />
            <div className="preview-overlay" />
            <div className="preview-badge">Image ready · click Run Analysis</div>
          </motion.div>
        ) : sampleKey ? (
          <motion.div
            key={`sample-${sampleKey}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {(() => {
              const s = SAMPLES.find(x => x.key === sampleKey);
              return (
                <div className={`sample-placeholder bg-gradient-to-br ${s.gradient}`} style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14 }}>
                  <div className="sample-emoji">{s.emoji}</div>
                  <div className="sample-name">{s.label}</div>
                  <div className="sample-tag">Sample Selected</div>
                </div>
              );
            })()}
          </motion.div>
        ) : (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className={`drop-zone-inner ${dragging ? "drag-over" : ""}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileRef.current.click()}
            >
              <div className="dz-icon">
                <Upload size={22} color="#10b981" />
              </div>
              <div className="dz-title">Drop your image here</div>
              <div className="dz-sub">
                or <span className="dz-browse">browse files</span>
              </div>
              <div style={{ fontSize: 11, color: "#334155", fontFamily: "var(--font-mono)" }}>
                PNG · JPG · WEBP · max 12MB
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="error-msg">
          <X size={12} />
          {error}
        </div>
      )}

      {/* Upload + Camera */}
      <div className="action-row">
        <button className="btn-secondary" style={{ flex: 1 }} onClick={() => fileRef.current.click()}>
          <Upload size={13} /> Upload
        </button>
        <button className="btn-secondary" style={{ flex: 1 }}>
          <Camera size={13} /> Camera
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={e => processFile(e.target.files[0])}
      />

      {/* Sample buttons */}
      <div className="sample-label">Quick test samples</div>
      <div className="samples-row">
        {SAMPLES.map(s => (
          <button
            key={s.key}
            className={`sample-btn ${sampleKey === s.key ? "active" : ""}`}
            onClick={() => onImage(null, s.key)}
          >
            {s.emoji} {s.label}
          </button>
        ))}
      </div>

      {/* Analyze Button */}
      <button
        className="btn-primary"
        style={{ width: "100%", marginTop: 20, padding: "14px" }}
        onClick={onAnalyze}
        disabled={!hasInput || analyzing}
      >
        {analyzing ? (
          <>
            <RefreshCw size={15} style={{ animation: "spin 1s linear infinite" }} />
            Analyzing Crop…
          </>
        ) : (
          <>
            <Zap size={15} />
            Run AI Analysis
          </>
        )}
      </button>

      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
