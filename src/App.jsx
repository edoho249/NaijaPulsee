import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import News from "./pages/News";
import Weather from "./pages/Weather";
import Lifestyle from "./pages/Lifestyle";
import Crypto from "./pages/Crypto"; // ✅ import crypto
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lifestyle" element={<Lifestyle />} />
          <Route path="/news" element={<News />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/crypto" element={<Crypto />} /> {/* ✅ crypto route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
