import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart2, PieChart, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Cell, PieChart as RechartsPie, Pie, Legend
} from "recharts";

function AnimatedBar({ name, value, color }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 100);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <span style={{ fontSize: 12.5, color: "#94a3b8", fontFamily: "var(--font-body)" }}>{name}</span>
        <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: color, fontWeight: 600 }}>{value.toFixed(1)}%</span>
      </div>
      <div className="prob-bar-track">
        <div
          className="prob-bar-fill"
          style={{ width: `${width}%`, background: `linear-gradient(90deg, ${color}aa, ${color})` }}
        />
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "rgba(10,18,26,0.96)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 10,
        padding: "10px 14px",
        fontSize: 12,
        fontFamily: "var(--font-mono)",
        color: "#e2e8f0",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
      }}>
        <div style={{ marginBottom: 4, color: "#94a3b8" }}>{label}</div>
        <div style={{ color: payload[0].payload.color, fontWeight: 600 }}>
          {payload[0].value.toFixed(1)}%
        </div>
      </div>
    );
  }
  return null;
};

export default function AnalyticsDashboard({ result }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
      <style>{`
        @media (max-width: 900px) {
          .analytics-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 1200px) {
          .analytics-grid { grid-template-columns: 1fr 1fr !important; }
        }
        .analytics-card-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 13.5px;
          color: #e2e8f0;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }
        .analytics-card-title svg { color: #10b981; }
      `}</style>

      {/* Probability Bars */}
      <div className="glass" style={{ padding: 24, gridColumn: "span 1" }}>
        <div className="analytics-card-title">
          <BarChart2 size={15} />
          Class Probabilities
        </div>
        <div>
          {result.probabilities.map(p => (
            <AnimatedBar key={p.name} name={p.name} value={p.value} color={p.color} />
          ))}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="glass" style={{ padding: 24 }}>
        <div className="analytics-card-title">
          <TrendingUp size={15} />
          Score Distribution
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={result.probabilities} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 9, fill: "#475569", fontFamily: "var(--font-display)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 9, fill: "#475569", fontFamily: "var(--font-mono)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Bar dataKey="value" radius={[5, 5, 0, 0]} maxBarSize={36}>
              {result.probabilities.map((entry, i) => (
                <Cell key={i} fill={entry.color} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Donut Chart */}
      <div className="glass" style={{ padding: 24 }}>
        <div className="analytics-card-title">
          <PieChart size={15} />
          Confidence Breakdown
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <RechartsPie>
            <Pie
              data={result.probabilities}
              cx="50%"
              cy="45%"
              innerRadius={52}
              outerRadius={78}
              paddingAngle={2}
              dataKey="value"
              strokeWidth={0}
            >
              {result.probabilities.map((entry, i) => (
                <Cell key={i} fill={entry.color} fillOpacity={0.88} />
              ))}
            </Pie>
            <Legend
              iconSize={8}
              iconType="circle"
              formatter={(val) => (
                <span style={{ fontSize: 11, color: "#64748b", fontFamily: "var(--font-display)" }}>{val}</span>
              )}
            />
          </RechartsPie>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
