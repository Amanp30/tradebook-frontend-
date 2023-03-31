import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import "./App.css";
import "./Colors.css";

import Dashboard from "./Dashboard";
import Trades from "./Trades";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trades" element={<Trades />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
