import React from "react";
import { IoIosTrendingUp, IoIosTrendingDown } from "react-icons/io";

const RevenueBox = ({ chartData, totalRevenue, totalLoss, type = "revenue" }) => {
  // If no chartData is provided, set it to an empty array
  const data = chartData || [];

  // Calculate the percentage change for revenue or loss
  let changePercent = 0;
  let isPositive = false;

  if (data.length >= 2) {
    const change = data[data.length - 1].value - data[0].value;
    changePercent = (change / data[0].value) * 100;
    isPositive = change >= 0;
  } else if (totalRevenue && totalLoss) {
    // Fallback for loss or revenue calculation
    changePercent = (totalLoss / totalRevenue) * 100;
    isPositive = totalLoss < totalRevenue;
  }

  const title = type === "revenue" ? "Estimated Inventory Value" : "Potential Loss if No Action";
  const totalValue = type === "revenue" ? totalRevenue : totalLoss;

  return (
    <div className="relative h-50 rounded-xl shadow-sm border border-dark-green bg-gradient-to-br bg-white p-3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-green-900">{title}</h2>
        <div className="flex items-center gap-1">
          {isPositive ? (
            <IoIosTrendingUp className="w-5 h-5 text-green-600" />
          ) : (
            <IoIosTrendingDown className="w-5 h-5 text-red-600" />
          )}
          <span
            className={`text-sm font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? "+" : "-"}
            {changePercent.toFixed(1)}%
          </span>
        </div>
      </div>

      <div
        className={`text-6xl font-bold ${
          isPositive ? "text-dark-green" : "text-red-700"
        } text-center mt-10`}
      >
        {type === "revenue"
          ? `$${Number(totalValue || 0).toLocaleString()}`
          : `-$${Number(totalValue || 0).toLocaleString()}`}
      </div>
    </div>
  );
};

export default RevenueBox;