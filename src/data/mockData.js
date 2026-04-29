// ─── The 4 classes your model detects ───────────────────────────────────────
// These IDs must EXACTLY match what your Python model returns as class labels.
// If your model returns e.g. "corn_earworm" instead of "earworm", update the
// id fields here and in MOCK_RESULTS keys to match.
export const PEST_CLASSES = [
  { id: "healthy",  label: "Healthy Corn",    color: "#10b981", emoji: "🌽" },
  { id: "earworm",  label: "Corn Earworm",    color: "#a78bfa", emoji: "🐛" },
  { id: "borer",    label: "Corn Borer",      color: "#f97316", emoji: "🐜" },
  { id: "rootworm", label: "Corn Rootworm",   color: "#ef4444", emoji: "🪲" },
];

// ─── Mock results used when backend is NOT connected ────────────────────────
// Shape here is IDENTICAL to what your real backend must return.
// See src/services/api.js for the exact JSON contract.
export const MOCK_RESULTS = {
  healthy: {
    pestId: "healthy",
    pest: "Healthy Corn",
    confidence: 96.4,
    severity: "none",
    severityLabel: "No Threat",
    color: "#10b981",
    description:
      "The corn plant shows no visible signs of pest infestation or disease. Leaf coloration, texture, and structural integrity are all within healthy parameters. Chlorophyll distribution appears uniform with no necrotic spots or lesions detected.",
    recommendation:
      "Continue standard integrated crop management protocols. Maintain optimal irrigation and balanced NPK fertilization. Schedule preventive scouting every 5–7 days during peak growing season to catch any early-stage threats before economic thresholds are reached.",
    warning:
      "Even healthy crops require vigilance. Monitor neighboring fields for pest pressure migration, especially during warm, humid conditions which favor rapid population buildups.",
    probabilities: [
      { name: "Healthy Corn",  value: 96.4, color: "#10b981" },
      { name: "Corn Earworm",  value: 1.8,  color: "#a78bfa" },
      { name: "Corn Borer",    value: 1.1,  color: "#f97316" },
      { name: "Corn Rootworm", value: 0.7,  color: "#ef4444" },
    ],
  },

  earworm: {
    pestId: "earworm",
    pest: "Corn Earworm",
    confidence: 93.2,
    severity: "high",
    severityLabel: "Critical",
    color: "#a78bfa",
    description:
      "Corn Earworm (Helicoverpa zea) detected with high confidence. This is one of the most damaging corn pests. Larvae enter the ear tip and feed downward on developing kernels, leaving behind moist frass and creating entry points for fungal pathogens such as Aspergillus and Fusarium.",
    recommendation:
      "Apply insecticides at early silk stage before larvae enter the ear: Spinosad, Chlorantraniliprole, or Lambda-cyhalothrin. Timing is critical — treat when 10% of silks have emerged. For biological control, Trichogramma egg parasitoids can be released at egg-laying periods. Destroy crop residues post-harvest to reduce overwintering populations.",
    warning:
      "Corn Earworm can cause 10–40% yield loss and significantly reduces grain quality. Infested ears are also prone to mycotoxin contamination (aflatoxin), which can make grain unsafe for consumption. Immediate action is strongly recommended.",
    probabilities: [
      { name: "Corn Earworm",  value: 93.2, color: "#a78bfa" },
      { name: "Corn Borer",    value: 4.1,  color: "#f97316" },
      { name: "Corn Rootworm", value: 1.7,  color: "#ef4444" },
      { name: "Healthy Corn",  value: 1.0,  color: "#10b981" },
    ],
  },

  borer: {
    pestId: "borer",
    pest: "Corn Borer",
    confidence: 89.7,
    severity: "high",
    severityLabel: "Critical",
    color: "#f97316",
    description:
      "Corn Borer (Ostrinia nubilalis — European Corn Borer) detected. Larvae bore into stalks, leaf midribs, and ears, disrupting nutrient and water transport. First-generation larvae shred whorl leaves; second-generation larvae tunnel into stalks causing stalk breakage (stalk lodging) and ear drop.",
    recommendation:
      "Scout whorls for frass and feeding damage. Economic threshold: 1+ egg mass per plant or ≥15% whorl damage. Apply Bacillus thuringiensis (Bt) sprays or insecticides (Chlorpyrifos, Cypermethrin) at egg hatch stage. Transgenic Bt corn hybrids provide season-long suppression. Destroy stalks by tillage or shredding after harvest to eliminate overwintering sites.",
    warning:
      "Corn Borer stalk tunneling significantly increases susceptibility to stalk rot pathogens. Lodged plants cannot be harvested efficiently, leading to total field losses in severely infested areas. Monitor weekly during tasseling period.",
    probabilities: [
      { name: "Corn Borer",    value: 89.7, color: "#f97316" },
      { name: "Corn Earworm",  value: 6.3,  color: "#a78bfa" },
      { name: "Corn Rootworm", value: 2.4,  color: "#ef4444" },
      { name: "Healthy Corn",  value: 1.6,  color: "#10b981" },
    ],
  },

  rootworm: {
    pestId: "rootworm",
    pest: "Corn Rootworm",
    confidence: 87.5,
    severity: "medium",
    severityLabel: "Moderate",
    color: "#ef4444",
    description:
      "Corn Rootworm (Diabrotica species) detected. Larvae feed on root hairs and primary roots, reducing the plant's ability to uptake water and nutrients. Heavily damaged root systems cause 'goose-necking' — the characteristic bending of lodged stalks as plants try to re-root. Adults also clip silks, interfering with pollination.",
    recommendation:
      "Use soil insecticides at planting (Counter, Force) or seed treatments in high-risk fields. Crop rotation (corn-soybean) is the most effective long-term management strategy as it breaks the pest cycle. Adult silk clipping should be monitored: if >50% of plants have silks clipped to <0.5 inch before 50% pollen shed, apply adult control spray.",
    warning:
      "Corn Rootworm is known to develop resistance to crop rotation and Bt traits in some regions. In fields with a history of continuous corn, rootworm pressure can be severe. Verify local resistance status before selecting management tools. Economic threshold for larvae: ≥0.5 larvae per plant root system.",
    probabilities: [
      { name: "Corn Rootworm", value: 87.5, color: "#ef4444" },
      { name: "Corn Borer",    value: 7.2,  color: "#f97316" },
      { name: "Corn Earworm",  value: 3.4,  color: "#a78bfa" },
      { name: "Healthy Corn",  value: 1.9,  color: "#10b981" },
    ],
  },
};

// ─── Sample buttons shown in the ImageInput panel ───────────────────────────
export const SAMPLES = [
  { key: "healthy",  label: "Healthy",  emoji: "🌿", gradient: "from-emerald-900/60 to-green-900/40" },
  { key: "earworm",  label: "Earworm",  emoji: "🐛", gradient: "from-violet-900/60 to-purple-900/40" },
  { key: "borer",    label: "Borer",    emoji: "🐜", gradient: "from-orange-900/60 to-amber-900/40"  },
  { key: "rootworm", label: "Rootworm", emoji: "🪲", gradient: "from-red-900/60 to-rose-900/40"      },
];

// ─── Sidebar system overview stats ──────────────────────────────────────────
export const SYSTEM_STATS = [
  { label: "Architecture", value: "EfficientNetb0" },
  { label: "Classes",      value: "4 categories" },
  { label: "Inference",    value: "~120ms" },
  { label: "Framework",    value: "PyTorch / TF" },
];

// ─── Capture guidelines shown in sidebar ────────────────────────────────────
export const GUIDELINES = [
  { text: "Capture images in bright, natural lighting for best accuracy" },
  { text: "Focus on the most visibly affected area of the plant" },
  { text: "Avoid blurry, backlit, or rain-covered images" },
  { text: "Scout during early morning (6–9 AM) for pest activity" },
  { text: "Include both healthy and affected leaves for comparison" },
];