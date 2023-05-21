import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import "./styles/App.css";
import "./styles/other.css";
import "./styles/Colors.css";

// auth
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Resetpassword from "./pages/auth/Resetpassword";
import Forgotpassword from "./pages/auth/Forgotpassword";

import Dashboard from "./pages/Dashboard";
import Detailtrdae from "./pages/Detailtrdae";
import Edittrade from "./pages/Edittrade";
import Newtrade from "./pages/Newtrade";
import Trades from "./pages/Trades";
import Accountdetails from "./pages/Accountdetails";
import Instruments from "./pages/Instruments";

// reports
import Reporttimeframe from "./pages/report/Reporttimeframe";
import Reportsymbol from "./pages/report/Reportsymbol";
import Reportyearly from "./pages/report/Reportyearly";
import Reportmonthly from "./pages/report/Reportmonthly";
import Reportweekday from "./pages/report/Reportweekday";
import Reportvolume from "./pages/report/Reportvolume";
import Reporthourly from "./pages/report/Reporthourly";
import Reportcalendar from "./pages/report/Reportcalendar";
import Reportholdingtime from "./pages/report/Reportholdingtime";

import ScrollToTop from "./components/scrollToTop";
import MyPreviousUrls from "./components/MyPreviousUrls";
import Notfound from "./components/Notfound";
import Newtradingsystem from "./pages/Newtradingsystem";
import Tradingsystem from "./pages/Tradingsystem";
import Viewtradingsystem from "./pages/Viewtradingsystem";
import Updatetradingsystem from "./pages/Updatetradingsystem";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <MyPreviousUrls />
        <Routes>
          <Route path="*" element={<Notfound />} />

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
          <Route path="/report/volumes" element={<Reportvolume />} />
          <Route path="/report/hourly" element={<Reporthourly />} />
          <Route path="/report/holding-time" element={<Reportholdingtime />} />
          <Route path="/report/calendar" element={<Reportcalendar />} />

          <Route path="/trading-system" element={<Tradingsystem />} />
          <Route path="/trading-system/new" element={<Newtradingsystem />} />
          <Route
            path="/trading-system/view/:systemid"
            element={<Viewtradingsystem />}
          />
          <Route
            path="/trading-system/edit/:systemid"
            element={<Updatetradingsystem />}
          />

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
