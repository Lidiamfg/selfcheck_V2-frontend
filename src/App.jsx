import { useState } from "react";
import "./App.css";
import HomePage from "./pages/Homepage/Homepage";
import InitialSettingPage from "./pages/InitialSettingPage/InitialSettingPage";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/initial-setting" element={<InitialSettingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
      {/* <Navbar />
      <Routes>
        
        
      </Routes> */}
    </>
  );
}

export default App;
