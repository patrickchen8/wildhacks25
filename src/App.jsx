import Chatbot from "./Pages/Chatbot";
import Dashboard from "./Pages/Dashboard";
import LandingPage from "./Pages/LandingPage"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useAuthState } from './utilities/firebase';
import { createContext } from 'react';

export const userContext = createContext();

const App = () => {
  const [user, loading] = useAuthState()

  if(loading) {
    return (
      <div className="flex justify-center items-center text-9xl">
        Loading...
      </div>
    )
  }


  return (
    user ? 
    <userContext.Provider value={user} >
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assistant" element={<Chatbot />} />
        </Routes>
      </Router>
    </userContext.Provider>


    :

    <Router>
      <Routes>
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
