import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import User from "./User";
import "./App.css";
import Navbar from "./components/Navbar";
import Career from "./Career";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/:user" element={<User />} />
          <Route path="/about/:user/career" element={<Career />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
