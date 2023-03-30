import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import "./App.css";
import "./Colors.css";

import Home from "./Home";
import Contact from "./Contact";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
