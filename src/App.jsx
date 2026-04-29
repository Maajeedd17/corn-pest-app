import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import HeroBanner from "./components/HeroBanner";
import ImageInput from "./components/ImageInput";
import PredictionPanel from "./components/PredictionPanel";
import AIAssistant from "./components/AIAssistant";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import GradCAMPanel from "./components/GradCAMPanel";
import ToastContainer from "./components/ToastContainer";
import { runPrediction } from "./services/api";

export default function App() {
  const [image, setImage] = useState(null);
  const [sampleKey, setSampleKey] = useState(null);
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const addToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000);
  }, []);

  const handleImage = useCallback((src, key = null) => {
    setImage(src);
    setSampleKey(key);
    setResult(null);
    addToast("Image loaded successfully", "success");
  }, [addToast]);

  // All model logic lives in src/services/api.js — edit that file to
  // switch between mock mode and your real Python backend.
  const handleAnalyze = useCallback(async () => {
    if (!image && !sampleKey) return;
    setAnalyzing(true);
    setResult(null);
    addToast("Running AI analysis…", "info");
    try {
      const prediction = await runPrediction(image);
      setResult(prediction);
      addToast("Analysis complete!", "success");
    } catch (err) {
      console.error("Prediction error:", err);
      addToast(`Error: ${err.message}`, "error");
    } finally {
      setAnalyzing(false);
    }
  }, [image, sampleKey, addToast]);

  const handleReset = useCallback(() => {
    setImage(null);
    setSampleKey(null);
    setResult(null);
    addToast("Reset complete", "info");
  }, [addToast]);

  return (
    <div className="app-root">
      <div className="ambient-layer" />
      <div className="grain-layer" />

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="main-content">
        <HeroBanner onMenuClick={() => setSidebarOpen(true)} />

        <div className="page-body">
          <div className="grid-primary">
            <div className="col-input">
              <ImageInput
                image={image}
                sampleKey={sampleKey}
                onImage={handleImage}
                onReset={handleReset}
                onAnalyze={handleAnalyze}
                analyzing={analyzing}
                hasResult={!!result}
              />
            </div>

            <div className="col-results">
              <AnimatePresence mode="wait">
                {(result || analyzing) && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="results-stack"
                  >
                    <PredictionPanel result={result} analyzing={analyzing} />
                    <AIAssistant result={result} analyzing={analyzing} />
                  </motion.div>
                )}
              </AnimatePresence>

              {!result && !analyzing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="empty-results"
                >
                  <div className="empty-icon">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <circle cx="24" cy="24" r="23" stroke="rgba(16,185,129,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
                      <path d="M16 24c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" fill="none" />
                      <path d="M24 20v4l3 3" stroke="rgba(16,185,129,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="empty-title">Awaiting Analysis</p>
                  <p className="empty-sub">Upload an image or select a sample, then run the AI engine to see predictions and recommendations.</p>
                </motion.div>
              )}
            </div>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <AnalyticsDashboard result={result} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {(result || image) && (
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <GradCAMPanel image={image} result={result} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className="page-footer">
          <div className="footer-dot" />
          <span>CornGuard AI · EfficientNet-B3 · 97.2% Accuracy · Final Year Project 2025</span>
        </footer>
      </main>

      <ToastContainer toasts={toasts} />
    </div>
  );
}
