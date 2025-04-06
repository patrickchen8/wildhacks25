import { useState, useEffect, useContext, useRef } from "react";
import Navbar from "../Components/Navbar.jsx";
import axios from "axios";
import { sendHarvestChat } from "../gemini/GeminiFunctions";
import RevenueBox from "../Components/RevenueBox";
import Table from "../Components/Table";
import ControlPanel from "../Components/ControlPanel.jsx";
import CropModal from "../Components/CropModal.jsx";
import AddModal from "../Components/AddModal.jsx";
import CropStoragePie from "../Components/CropStoragePie.jsx";
import RevenueBarChart from "../Components/RevenueBarChart.jsx";
import CropSpoilageChart from "../Components/CropSpoilageChart.jsx";
import { useDbData } from "../utilities/firebase";
import { userContext } from "../App";
import { CircularProgress } from "@mui/material";

const Dashboard = ({ setForecast, setRecommendations, setSummary, forecast, recommendations, summary }) => {
  const user = useContext(userContext);
  const [dbInventory, error] = useDbData(`/${user.uid}`);
  const [cropId, setCropId] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingRecs, setLoadingRecs] = useState(true);
  const [selected, setSelected] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [location, setLocation] = useState("London");
  const [cityList, setCityList] = useState(["London", "New York", "Paris"]);
  const [cityInput, setCityInput] = useState("");
  const [showCityInput, setShowCityInput] = useState(false);
  const [filterUnhealthy, setFilterUnhealthy] = useState(false);

  const cityInputRef = useRef(null);
  const popupRef = useRef(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const inventoryArray = dbInventory
    ? Object.values(dbInventory).filter((item) => item?.crop)
    : [];

  const revenueData = recommendations.map((item) => ({
    name: item.crop,
    revenue: item.totalPotentialRevenue,
  }));

  const spoilageChartData = recommendations.map((item) => {
    const inv = inventoryArray.find((c) => c.crop === item.crop);
    const sellByDate = new Date(item.sellByDate);
    const today = new Date();
    const daysLeft = Math.max(0, Math.ceil((sellByDate - today) / (1000 * 60 * 60 * 24)));

    return {
      crop: item.crop,
      daysLeft,
      spoilagePrediction: item.spoilagePrediction || 0,
    };
  });

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
          params: {
            key: API_KEY,
            q: location,
            days: 5,
          },
        });

        const forecastData = res.data.forecast.forecastday;
        setForecast(forecastData);

        if (inventoryArray.length) {
          const llmResponse = await sendHarvestChat(inventoryArray, forecastData);

          if (llmResponse?.recommendations && llmResponse?.summary) {
            setRecommendations(llmResponse.recommendations);
            setSummary(llmResponse.summary);
          } else {
            console.warn("LLM response malformed:", llmResponse);
          }
        }

        setLoading(false);
        setLoadingRecs(false);
      } catch (err) {
        console.error("Weather or LLM error:", err);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [dbInventory, location]);

  const handleAddCity = () => {
    if (cityInput.trim() && !cityList.includes(cityInput.trim())) {
      setCityList([...cityList, cityInput.trim()]);
      setCityInput(""); 
      setShowCityInput(false);
    }
  };

  const closePopup = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target) && !cityInputRef.current.contains(e.target)) {
      setShowCityInput(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closePopup);

    return () => {
      document.removeEventListener("mousedown", closePopup);
    };
  }, []);

  if (dbInventory === undefined) {
    return (<div> Loading...</div>);
  }

  return (
    <div className="flex flex-col h-[100vh] bg-gradient-to-b from-[#DCEFD8] to-[#F1F9EF]">
      <Navbar />
      
      {loading && (
        <div className="absolute inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <CircularProgress size={50} color="primary" />
        </div>
      )}

      <div className="grid gap-4 p-6 overflow-auto">
        {summary && (
          <>
            <div className="flex w-full gap-4">
              <div className="w-3/10">
                <RevenueBox type="revenue" totalRevenue={summary.totalPotentialRevenue} totalLoss={summary.potentialLossIfNoAction}/>
              </div>
              <div className="w-3/10">
                <RevenueBox
                  type="loss"
                  totalLoss={summary.potentialLossIfNoAction}
                  totalRevenue={summary.totalPotentialRevenue}
                />
              </div>
              <div className="w-2/5">
                <div className="bg-white p-3 rounded-xl shadow-md border border-dark-green h-50">
                  <h3 className="text-xl font-semibold text-green-900 mb-2">Weather Forecast</h3>
                  <div className="absolute top-4 right-4 space-x-2">
                    <select
                      className="border border-gray-300 p-1 rounded-md w-40"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      {cityList.map((city, idx) => (
                        <option key={idx} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => setShowCityInput(!showCityInput)}
                      className="text-green-600 font-bold text-sm border border-gray-300 px-2 py-1 rounded-md"
                    >
                      {showCityInput ? "-" : "+"}
                    </button>
                  </div>

                  {/* Popup for adding city */}
                  {showCityInput && (
  <div
    className="fixed inset-0 bg-opacity-30 border border-dark-green flex justify-center items-center z-50"
    onClick={() => setShowCityInput(false)} // close popup when background is clicked
  >
    <div
      className="bg-white p-6 rounded-lg border border-dark-green shadow-lg w-80"
      onClick={(e) => e.stopPropagation()} // don't close when clicking inside
    >
      <h3 className="text-lg font-semibold text-center mb-4">Add a New City</h3>
      <input
        type="text"
        className="border border-gray-300 p-2 rounded-md w-full mb-4"
        placeholder="Enter City"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
      />
      <button
        className="w-full bg-green-800 hover:bg-green-900 transition duration-300 text-white p-2 rounded-md"
        onClick={handleAddCity}
      >
        Add City
      </button>
    </div>
  </div>
)}

                  <div className="flex gap-4 overflow-x-auto justify-center pb-2">
                    {forecast.map((day, idx) => (
                      <div
                        key={idx}
                        className="w-28 bg-green-50 border border-dark-green rounded-xl p-2 flex flex-col items-center shadow-md"
                      >
                        <p className="text-md font-semibold text-dark-green mb-1">
                          {new Date(day.date).toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </p>
                        <img
                          src={`https:${day.day.condition.icon}`}
                          alt={day.day.condition.text}
                          className="w-14 h-14 mb-2"
                        />
                        <p className="text-sm text-dark-green font-medium">
                          {Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {!loadingRecs && (
              <div className="flex gap-4 justify-between">
                <div className="w-1/3">
                  <CropStoragePie recommendations={recommendations} />
                </div>
                <div className="w-1/3">
                  <RevenueBarChart data={revenueData} />
                </div>
                <div className="w-1/3">
                  <CropSpoilageChart data={spoilageChartData} />
                </div>
              </div>
            )}

            <ControlPanel
              selected={selected}
              setSelected={setSelected}
              setIsOpen={setIsOpen2}
              data={inventoryArray}
              setFilterUnhealthy={setFilterUnhealthy} // Pass the function to handle filtering
            />
            <Table 
              data={dbInventory} 
              setIsOpen={setIsOpen} 
              setCropId={setCropId} 
              recommendations={recommendations} 
              filterUnhealthy={filterUnhealthy} // Pass the filterUnhealthy state
            />
            {isOpen && <CropModal data={dbInventory} setIsOpen={setIsOpen} cropId={cropId} />}
            {isOpen2 && <AddModal setIsOpen={setIsOpen2} />}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;