import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeTableau10 } from "d3-scale-chromatic";

const colorScale = scaleOrdinal(schemeTableau10);

const COLORS = ["#4ade80", "#60a5fa", "#facc15", "#f87171", "#a78bfa"];

const RevenueBarChart = ({ data }) => {
  return (
    <div className="w-full bg-white p-3 rounded-xl shadow border border-dark-green h-85">
      <h2 className="text-xl font-semibold text-green-900 mb-6">Revenue by Crop</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 50 }}
        >
          <XAxis
            dataKey="name"
            type="category"
            stroke="#4B5563"
            tick={{ fontSize: 14, width: 80, wordBreak: 'break-word' }}
            interval={0}
          />
          <YAxis
            stroke="#4B5563"
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            formatter={(value) => `$${value.toLocaleString()}`}
            cursor={{ fill: "#f0fdf4" }}
          />
          <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
            {data.map((item, index) => (
              <Cell key={`cell-${index}`} fill={colorScale(item.name)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueBarChart;