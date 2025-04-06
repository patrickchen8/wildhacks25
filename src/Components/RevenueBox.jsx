import React from "react";
import { IoIosTrendingUp, IoIosTrendingDown } from "react-icons/io";

const RevenueBox = ({ chartData, totalRevenue, totalLoss, type = "revenue" }) => {
  const fallbackData = [
    { date: "Day 1", value: 1250 },
    { date: "Day 2", value: 1400 },
    { date: "Day 3", value: 1320 },
    { date: "Day 4", value: 1500 },
    { date: "Day 5", value: 1470 },
    { date: "Day 6", value: 1550 },
    { date: "Today", value: 1650 },
  ];

  const isRevenue = type === "revenue";

  const data = chartData?.length ? chartData : fallbackData;
  const change = data.length >= 2 ? data[data.length - 1].value - data[0].value : 0;
  const changePercent = isRevenue
    ? ((change / data[0].value) * 100).toFixed(1)
    : ((totalLoss / totalRevenue) * 100).toFixed(1);

  const isPositive = isRevenue ? change >= 0 : false;
  const title = isRevenue ? "Estimated Inventory Value" : "Potential Loss if No Action";
  const totalValue = isRevenue ? totalRevenue : totalLoss;

  return (
    <div className="relative w-110 h-60 rounded-xl shadow-sm border border-dark-green bg-gradient-to-br bg-tan p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-dark-green">{title}</h2>
        <div className="flex items-center gap-1">
          {isPositive ? (
            <IoIosTrendingUp className="w-5 h-5 text-green-600" />
          ) : (
            <IoIosTrendingDown className="w-5 h-5 text-red-600" />
          )}
          <span className={`text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
            {isPositive ? "+" : "-"}
            {changePercent}%
          </span>
        </div>
      </div>

      <div className={`text-6xl font-bold ${isPositive ? "text-dark-green" : "text-red-700"} text-center mt-10`}>
        {isRevenue
          ? `$${Number(totalValue || 0).toLocaleString()}`
          : `-$${Number(totalValue || 0).toLocaleString()}`}
      </div>
    </div>
  );
};

export default RevenueBox;