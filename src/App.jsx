import "./App.css";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
