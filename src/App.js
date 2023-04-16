import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import "./styles/App.css";
import "./styles/other.css";
import "./styles/Colors.css";

import Dashboard from "./pages/Dashboard";
import Detailtrdae from "./pages/Detailtrdae";
import Edittrade from "./pages/Edittrade";
import Forgotpassword from "./pages/Forgotpassword";
import Login from "./pages/Login";
import Newtrade from "./pages/Newtrade";
import Resetpassword from "./pages/Resetpassword";
import Signup from "./pages/Signup";
import Trades from "./pages/Trades";
import Accountdetails from "./pages/Accountdetails";
import Instruments from "./pages/Instruments";
import Importtrades from "./pages/Importtrades";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trades" element={<Trades />} />
          <Route path="/new-trade" element={<Newtrade />} />
          <Route path="/edit/:tradeid" element={<Edittrade />} />
          <Route path="/detail/:trade" element={<Detailtrdae />} />
          <Route path="/account-details" element={<Accountdetails />} />
          <Route path="/instruments" element={<Instruments />} />
          <Route path="/import-trades" element={<Importtrades />} />

          {/* Signup routes */}
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/signup" element={<Signup />} />
          <Route path="/account/forgot-password" element={<Forgotpassword />} />
          <Route path="/account/reset/:link" element={<Resetpassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
