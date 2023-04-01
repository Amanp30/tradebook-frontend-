import React, { useState } from "react";
import Layout from "./components/Layout";
import Textinput from "./components/Textinput";

function Dashboard() {
  const [instrument, setinstrument] = useState("");
  return (
    <>
      <Layout>
        <Textinput
          placeholder="Instrument"
          state={instrument}
          setstate={setinstrument}
        />
        {instrument}
        <div style={{ display: "flex", gap: "5%" }}>
          <div className="thebox">
            <p>sdfgsjfjghhjsdfjh </p>
            <p>sdfgsjfjghhjsdfjh </p>
            <p>sdfgsjfjghhjsdfjh </p>
            <p>sdfgsjfjghhjsdfjh </p>
            <p>sdfgsjfjghhjsdfjh </p>
            <p>sdfgsjfjghhjsdfjh </p>
            <p>sdfgsjfjghhjsdfjh </p>
            <p>sdfgsjfjghhjsdfjh </p>
          </div>

          <div className="thebox">
            <p>sdfgsjfjghhjsdfjh </p>
            <p>sdfgsjfjghhjsdfjh </p>
            <p>sdfgsjfjghhjsdfjh </p>
            <p>sdfgsjfjghhjsdfjh </p>
            <p>sdfgsjfjghhjsdfjh </p>
            <p>sdfgsjfjghhjsdfjh </p>
            <p>sdfgsjfjghhjsdfjh </p>
            <p>sdfgsjfjghhjsdfjh </p>
          </div>
        </div>
        <div className="thebox">
          <p>sdfgsjfjghhjsdfjh </p>
          <p>sdfgsjfjghhjsdfjh </p>
          <p>sdfgsjfjghhjsdfjh </p>
          <p>sdfgsjfjghhjsdfjh </p>
          <p>sdfgsjfjghhjsdfjh </p>
          <p>sdfgsjfjghhjsdfjh </p>
          <p>sdfgsjfjghhjsdfjh </p>
          <p>sdfgsjfjghhjsdfjh </p>
        </div>
      </Layout>
    </>
  );
}

export default Dashboard;
