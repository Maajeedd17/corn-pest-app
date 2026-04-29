// ============================================================
//  src/services/api.js
//  THE ONLY FILE YOU NEED TO EDIT TO CONNECT YOUR REAL MODEL
// ============================================================
//
//  HOW IT WORKS
//  ─────────────────────────────────────────────────────────
//  1. Set USE_MOCK = false  (line 20) once your backend is ready.
//  2. Set API_BASE_URL to your Python server address  (line 23).
//  3. Make sure your Python backend returns JSON in the exact
//     shape described in the "REQUIRED RESPONSE FORMAT" section
//     below.  That's it — the entire frontend will work.
//
//  Nothing else needs to change anywhere else in the project.
// ============================================================

// ── STEP 1 ── Set to false = use real model. Set to true = use mock data.
const USE_MOCK = false;

// ── STEP 2 ── Your Python (Flask / FastAPI) server URL
const API_BASE_URL = "https://corn-pest-api-xeke.onrender.com";

// ── STEP 3 ── The endpoint path on your server
const PREDICT_ENDPOINT = `${API_BASE_URL}/predict`;

// ============================================================
//  REQUIRED RESPONSE FORMAT
//  Your Python backend /predict endpoint must return this JSON:
//
//  {
//    "predicted_class": "earworm",          // string — one of:
//                                           //   "healthy" | "earworm"
//                                           //   "borer"   | "rootworm"
//    "confidence": 93.2,                    // float 0–100
//    "probabilities": {                     // all 4 classes, 0–100
//      "healthy":  1.0,
//      "earworm":  93.2,
//      "borer":    4.1,
//      "rootworm": 1.7
//    },
//    "gradcam_heatmap": "<base64-png>",     // optional — base64 image string
//    "gradcam_overlay":  "<base64-png>"     // optional — base64 image string
//  }
//
//  The frontend maps predicted_class → full pest info automatically
//  using CLASS_META below. You do NOT need to send description /
//  recommendation / warning from the backend.
// ============================================================

import { MOCK_RESULTS } from "../data/mockData";

// Color + label lookup keyed by the class id your model returns
const CLASS_META = {
  healthy:  { pest: "Healthy Corn",    color: "#10b981", severity: "none",   severityLabel: "No Threat" },
  earworm:  { pest: "Corn Earworm",    color: "#a78bfa", severity: "high",   severityLabel: "Critical"  },
  borer:    { pest: "Corn Borer",      color: "#f97316", severity: "high",   severityLabel: "Critical"  },
  rootworm: { pest: "Corn Rootworm",   color: "#ef4444", severity: "medium", severityLabel: "Moderate"  },
};

// Color for each class in probability bars / charts
const CLASS_COLORS = {
  healthy:  "#10b981",
  earworm:  "#a78bfa",
  borer:    "#f97316",
  rootworm: "#ef4444",
};

// Human-readable names for probability bars
const CLASS_LABELS = {
  healthy:  "Healthy Corn",
  earworm:  "Corn Earworm",
  borer:    "Corn Borer",
  rootworm: "Corn Rootworm",
};

// AI-generated descriptions, recommendations, warnings per class
// (kept here so the backend stays lightweight — pure ML output only)
const CLASS_CONTENT = {
  healthy: {
    description:
      "The corn plant shows no visible signs of pest infestation or disease. Leaf coloration, texture, and structural integrity are all within healthy parameters. Chlorophyll distribution appears uniform with no necrotic spots or lesions detected.",
    recommendation:
      "Continue standard integrated crop management protocols. Maintain optimal irrigation and balanced NPK fertilization. Schedule preventive scouting every 5–7 days during peak growing season.",
    warning:
      "Even healthy crops require vigilance. Monitor neighboring fields for pest pressure migration, especially during warm, humid conditions.",
  },
  earworm: {
    description:
      "Corn Earworm (Helicoverpa zea) detected. Larvae enter the ear tip and feed downward on developing kernels, leaving behind moist frass and creating entry points for fungal pathogens such as Aspergillus and Fusarium.",
    recommendation:
      "Apply insecticides at early silk stage before larvae enter the ear: Spinosad, Chlorantraniliprole, or Lambda-cyhalothrin. Timing is critical — treat when 10% of silks have emerged. Trichogramma egg parasitoids can be released for biological control.",
    warning:
      "Corn Earworm can cause 10–40% yield loss. Infested ears are prone to mycotoxin contamination (aflatoxin), which can make grain unsafe for human or animal consumption. Immediate action is strongly recommended.",
  },
  borer: {
    description:
      "Corn Borer (Ostrinia nubilalis) detected. Larvae bore into stalks, leaf midribs, and ears, disrupting nutrient and water transport. First-generation larvae shred whorl leaves; second-generation larvae tunnel into stalks causing stalk lodging and ear drop.",
    recommendation:
      "Scout whorls for frass and feeding damage. Economic threshold: ≥1 egg mass per plant or ≥15% whorl damage. Apply Bacillus thuringiensis (Bt) sprays or Chlorpyrifos at egg hatch stage. Destroy stalks by tillage after harvest.",
    warning:
      "Corn Borer stalk tunneling significantly increases susceptibility to stalk rot. Lodged plants cannot be harvested efficiently. Monitor weekly during tasseling period.",
  },
  rootworm: {
    description:
      "Corn Rootworm (Diabrotica species) detected. Larvae feed on root hairs and primary roots, reducing water and nutrient uptake. Heavily damaged root systems cause 'goose-necking'. Adults clip silks, interfering with pollination.",
    recommendation:
      "Use soil insecticides at planting or seed treatments in high-risk fields. Crop rotation (corn–soybean) is the most effective long-term strategy. Monitor adult silk clipping: treat if >50% of plants have silks clipped to <0.5 inch before 50% pollen shed.",
    warning:
      "Corn Rootworm is known to develop resistance to crop rotation and Bt traits in some regions. In continuous corn fields, pressure can be severe. Economic threshold for larvae: ≥0.5 larvae per plant root system.",
  },
};

// ============================================================
//  INTERNAL HELPERS — do not edit below this line
// ============================================================

/**
 * Converts the raw JSON from your backend into the result shape
 * expected by every component in this app.
 */
function buildResult(apiResponse) {
  const classId = apiResponse.predicted_class;
  const meta = CLASS_META[classId] || CLASS_META.healthy;
  const content = CLASS_CONTENT[classId] || CLASS_CONTENT.healthy;

  // Convert { healthy: 1.0, earworm: 93.2, ... } → sorted array for charts
  const probabilities = Object.entries(apiResponse.probabilities)
    .map(([id, value]) => ({
      name:  CLASS_LABELS[id] || id,
      value: parseFloat(value),
      color: CLASS_COLORS[id] || "#94a3b8",
    }))
    .sort((a, b) => b.value - a.value);

  return {
    pestId:        classId,
    pest:          meta.pest,
    confidence:    parseFloat(apiResponse.confidence),
    severity:      meta.severity,
    severityLabel: meta.severityLabel,
    color:         meta.color,
    description:   content.description,
    recommendation: content.recommendation,
    warning:       content.warning,
    probabilities,
    // Grad-CAM images from backend (base64 strings or null)
    gradcamHeatmap: apiResponse.gradcam_heatmap || null,
    gradcamOverlay: apiResponse.gradcam_overlay  || null,
  };
}

// ============================================================
//  MAIN EXPORTED FUNCTION
//  Called by App.jsx — returns a result object or throws.
// ============================================================

/**
 * @param {string|null} imageDataUrl  - base64 data URL from file upload
 * @param {string|null} sampleKey     - one of "healthy"|"earworm"|"borer"|"rootworm"
 * @returns {Promise<object>}          - result object consumed by all components
 */
export async function runPrediction(imageDataUrl, sampleKey) {

  // ── MOCK MODE ── returns fake data instantly (no backend needed)
  if (USE_MOCK) {
    const key = sampleKey || "earworm";
    return new Promise((resolve) =>
      setTimeout(() => resolve(MOCK_RESULTS[key] || MOCK_RESULTS.earworm), 2400)
    );
  }

  // ── REAL MODEL MODE ── sends image to your Python backend
  // Convert data URL → Blob → FormData
  const blob = await fetch(imageDataUrl).then((r) => r.blob());
  const formData = new FormData();
  formData.append("file", blob, "crop_image.jpg");

  // ── STEP 4 ── If your endpoint expects a different field name,
  //             change "file" above to match your backend.
  //             e.g. formData.append("image", blob, "crop.jpg")

  const response = await fetch(PREDICT_ENDPOINT, {
    method: "POST",
    body: formData,
    // If your backend requires an API key or auth header, add it here:
    // headers: { "Authorization": "Bearer YOUR_KEY" },
  });

  if (!response.ok) {
    const msg = await response.text().catch(() => response.statusText);
    throw new Error(`Server error ${response.status}: ${msg}`);
  }

  const apiResponse = await response.json();

  // ── STEP 5 ── If your backend returns different field names,
  //             map them here before passing to buildResult().
  //             Example if your model returns "class" instead of "predicted_class":
  //   apiResponse.predicted_class = apiResponse.class;
  //   apiResponse.probabilities   = apiResponse.scores;

  return buildResult(apiResponse);
}
