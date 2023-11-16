import { useState } from "react";
import "./App.css";
import HomePage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
