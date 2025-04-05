import Chatbot from "./Pages/Chatbot";
import Dashboard from "./Pages/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/assistant" element={<Chatbot />} />
      </Routes>
    </Router>
  );
};

export default App;
