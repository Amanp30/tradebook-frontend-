import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import User from "./User";
import "./App.css";
import Navbar from "./components/Navbar";
import Career from "./Career";
import Products from "./Products";
import Brand from "./Brand";

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

          <Route path="/products" element={<Products />} />
          <Route path="/products/:brand" element={<Brand />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
