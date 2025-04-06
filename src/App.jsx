import { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthState } from './utilities/firebase';
import { createContext } from 'react';
import Chatbot from "./Pages/Chatbot";
import Dashboard from "./Pages/Dashboard";
import LandingPage from "./Pages/LandingPage";

export const userContext = createContext();

const App = () => {
  const [user, loading] = useAuthState();
  const [recommendations, setRecommendations] = useState([]);
  const [summary, setSummary] = useState(null);
  const [forecast, setForecast] = useState([]);

  if (loading) {
    return (
      <div className="flex justify-center items-center text-9xl">
        {/* Loading... */}
      </div>
    );
  }

  return (
    user ? (
      <userContext.Provider value={user}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  forecast={forecast}
                  setForecast={setForecast}
                  recommendations={recommendations}
                  setRecommendations={setRecommendations}
                  summary={summary}
                  setSummary={setSummary}
                />
              }
            />
            <Route
              path="/assistant"
              element={
                <Chatbot
                  forecast={forecast}
                  recommendations={recommendations}
                  summary={summary}
                />
              }
            />
          </Routes>
        </Router>
      </userContext.Provider>
    ) : (
      <Router>
        <Routes>
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Router>
    )
  );
};

export default App;