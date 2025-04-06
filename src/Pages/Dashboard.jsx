import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar.jsx";
import axios from "axios";
import { sendHarvestChat } from "../gemini/GeminiFunctions";
import RevenueBox from "../Components/RevenueBox";
import Table from '../Components/Table'
import ControlPanel from "../Components/ControlPanel.jsx"
import CropModal from "../Components/CropModal.jsx";


const Dashboard = () => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loadingRecs, setLoadingRecs] = useState(true);

  const inventory = [
    {
      crop: "Maize",
      storageType: "Airtight plastic container",
      healthStatus: "Good",
      amount: "120kg",
      harvestDate: "2024-03-01",
      sellByDate: "2024-04-20",
      lastUpdate: "2024-04-03",
    },
    {
      crop: "Cassava",
      storageType: "Open-air shed",
      healthStatus: "At Risk",
      amount: "80kg",
      harvestDate: "2024-03-15",
      sellByDate: "2024-04-10",
      lastUpdate: "2024-04-05",
    },
  ];

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const CITY = "Nairobi";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json`,
          {
            params: {
              key: API_KEY,
              q: CITY,
              days: 5,
            },
          }
        );
        const forecastData = res.data.forecast.forecastday;
        setForecast(forecastData);

        const llmResponse = await sendHarvestChat(inventory, forecastData);

        if (llmResponse && llmResponse.recommendations && llmResponse.summary) {
          setRecommendations(llmResponse.recommendations);
          setSummary(llmResponse.summary);
          console.log(llmResponse.summary)
        } else {
          console.warn("Invalid format from LLM:", llmResponse);
        }

        setLoadingRecs(false);
      } catch (error) {
        console.error("WeatherAPI or LLM error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getRiskColor = (level) => {
    switch (level) {
      case "Low":
        return "text-green-600";
      case "Medium":
        return "text-yellow-600";
      case "High":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

    const [selected, setSelected] = useState('All');
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-[100vh] bg-gradient-to-b from-[#DCEFD8] to-[#F1F9EF]">
      <Navbar />
      <div className="grid gap-4 p-6">
        {summary && (
        <>
        <div className="flex flex-wrap gap-4 justify-center">
          <RevenueBox type = "revenue" totalRevenue = {summary.totalPotentialRevenue}/>
          <RevenueBox type = "loss" totalLoss = {summary.potentialLossIfNoAction} totalRevenue={summary.totalPotentialRevenue}/>
          {loading ? (
            <p className="text-gray-500">Loading weather...</p>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-h-60">
              <h3 className="text-2xl font-bold text-green-900 mb-4">Weather Forecast</h3>
              <div className="flex gap-6 overflow-x-auto pb-2">
                {forecast.map((day, idx) => (
                  <div
                    key={idx}
                    className="w-28 bg-green-50 border border-green-200 rounded-xl p-4 flex flex-col items-center shadow-sm"
                  >
                    <p className="text-md font-semibold text-green-800 mb-1">
                      {new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </p>
                    <img
                      src={`https:${day.day.condition.icon}`}
                      alt={day.day.condition.text}
                      className="w-14 h-14 mb-2"
                    />
                    <p className="text-sm text-green-700 font-medium">
                      {Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        </>
        )}

        {/* {loadingRecs ? (
          <p className="text-gray-500">Loading crop recommendations...</p>
        ) : (
          recommendations.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md border border-gray-200 rounded-lg p-5"
            >
              <h2 className="text-xl font-semibold mb-1">{item.crop}</h2>
              <p className={`mb-2 font-medium ${getRiskColor(item.riskLevel)}`}>
                Risk Level: {item.riskLevel}
              </p>
              <p className="mb-1">
                <strong>Recommendation:</strong> {item.recommendation}
              </p>
              <p>
                <strong>Action:</strong>{" "}
                <span className="font-semibold">{item.action}</span>
              </p>
              <p className="mt-2 text-green-700 font-semibold">
                Estimated Revenue: ${item.totalPotentialRevenue.toLocaleString()}
              </p>
            </div>
          ))
        )} */}
      </div>
        <ControlPanel selected={selected} setSelected={setSelected} />
        <Table setIsOpen={setIsOpen}/>
        <CropModal isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  );
};

export default Dashboard;


