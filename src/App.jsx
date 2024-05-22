import "./App.css";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signUp";
import GetStartedPage from "./pages/get-started";
import Patient from "./pages/patient";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/get-started">
          <Route path="" element={<GetStartedPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        {/* for child routing */}
        <Route path="/patient/*" element={<Patient />} />
      </Routes>


    </>
  );
}

export default App;
