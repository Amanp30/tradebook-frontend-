import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import "./App.css";
import "./Colors.css";

import Dashboard from "./Dashboard";
import Detailtrdae from "./Detailtrdae";
import Edittrade from "./Edittrade";
import Forgotpassword from "./Forgotpassword";
import Login from "./Login";
import Newtrade from "./Newtrade";
import Resetpassword from "./Resetpassword";
import Signup from "./Signup";
import Trades from "./Trades";

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
