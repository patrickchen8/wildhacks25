import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const RISK_COLOR_MAP = {
  Low: "#4ade80",
  Medium: "#facc15",
  High: "#f87171", 
  Unknown: "#a8a29e",
};

const CropStoragePie = ({ recommendations }) => {
  const riskCounts = { Low: 0, Medium: 0, High: 0 };

  recommendations.forEach((rec) => {
    if (riskCounts[rec.riskLevel] !== undefined) {
      riskCounts[rec.riskLevel]++;
    }
  });

  const data = Object.entries(riskCounts).map(([risk, count]) => ({
    name: risk,
    value: count,
    risk,
  }));

  return (
    <div className="w-full bg-white p-3 rounded-xl shadow border border-dark-green h-85">
      <h2 className="text-xl font-semibold text-green-900 mb-2">Risk Level Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={100}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={RISK_COLOR_MAP[entry.risk] || RISK_COLOR_MAP.Unknown}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CropStoragePie;