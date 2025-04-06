import Chatbot from "./Pages/Chatbot";
import Dashboard from "./Pages/Dashboard";
import LandingPage from "./Pages/LandingPage"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useAuthState } from './utilities/firebase';

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
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/assistant" element={<Chatbot />} />
      </Routes>
    </Router>

    :

    <Router>
      <Routes>
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
