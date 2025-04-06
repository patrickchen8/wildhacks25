import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const CropSpoilageChart = ({ data }) => {
  return (
    <div className="w-full bg-white p-3 rounded-xl shadow border border-dark-green h-85">
      <h2 className="text-xl font-semibold text-green-900 mb-4">
        Spoilage Risk vs Sell-By Days
      </h2>
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="crop" stroke="#4B5563" tick={{ fontSize: 12 }} />
          <YAxis
            yAxisId="left"
            stroke="#4B5563"
            tick={{ fontSize: 12 }}
            label={{
              value: "Days Until Sell-By",
              angle: -90,
              position: "insideLeft",
              offset: -5,
              style: { fill: "#4B5563", fontSize: 12 },
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#4B5563"
            tick={{ fontSize: 12 }}
            domain={[0, 1]}
            label={{
              value: "Spoilage Risk",
              angle: 90,
              position: "insideRight",
              offset: 10,
              style: { fill: "#4B5563", fontSize: 12 },
            }}
          />
          <Tooltip
            formatter={(value, name) =>
              name === "Days Until Sell-By"
                ? [`${value} days`, name]
                : [`${(value * 100).toFixed(0)}%`, name]
            }
          />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="daysLeft"
            fill="#4ade80"
            name="Days Until Sell-By"
            radius={[4, 4, 0, 0]}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="spoilagePrediction"
            stroke="#f87171"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Spoilage Risk"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CropSpoilageChart;