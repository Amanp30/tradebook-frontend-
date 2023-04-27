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
import Reporttimeframe from "./pages/Reporttimeframe";
import Reportsymbol from "./pages/Reportsymbol";
import Reportyearly from "./pages/Reportyearly";
import Reportmonthly from "./pages/Reportmonthly";
import Reportweekday from "./pages/Reportweekday";

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

          <Route path="/report/timeframe" element={<Reporttimeframe />} />
          <Route path="/report/symbol" element={<Reportsymbol />} />
          <Route path="/report/yearly" element={<Reportyearly />} />
          <Route path="/report/monthly" element={<Reportmonthly />} />
          <Route path="/report/weekday" element={<Reportweekday />} />

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
