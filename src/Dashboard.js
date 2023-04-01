import React, { useState } from "react";
import Layout from "./components/Layout";
import Theinput from "./components/Theinput";

function Dashboard() {
  const [instrument, setinstrument] = useState("");
  const [quantity, setquantity] = useState("");
  return (
    <>
      <Layout>
        <div className="dashboardclass thebox">
          <Theinput
            type="text"
            label="Symbol   or instrument"
            placeholder="Instrument"
            state={instrument}
            setstate={setinstrument}
          />
          <Theinput
            type="number"
            label="Quantity"
            placeholder="Instrument"
            state={quantity}
            setstate={setquantity}
          />
          <Theinput
            type="password"
            label="Password"
            placeholder="Instrument"
            state={quantity}
            setstate={setquantity}
          />
          <Theinput
            type="email"
            label="email"
            placeholder="Instrument"
            state={quantity}
            setstate={setquantity}
          />
          <Theinput
            type="date"
            label="date"
            placeholder="Instrument"
            state={quantity}
            setstate={setquantity}
          />
          <Theinput
            label="Buy Price"
            placeholder="Instrument"
            state={quantity}
            setstate={setquantity}
          />
          <Theinput
            label="Buy Price"
            placeholder="Instrument"
            state={quantity}
            setstate={setquantity}
          />
          <Theinput
            label="Buy Price"
            placeholder="Instrument"
            state={quantity}
            setstate={setquantity}
          />
          <Theinput
            label="Buy Price"
            placeholder="Instrument"
            state={quantity}
            setstate={setquantity}
          />
          <Theinput
            label="Buy Price"
            placeholder="Instrument"
            state={quantity}
            setstate={setquantity}
          />
          <Theinput
            label="Buy Price"
            placeholder="Instrument"
            state={quantity}
            setstate={setquantity}
          />
          <Theinput
            label="Buy Price"
            placeholder="Instrument"
            state={quantity}
            setstate={setquantity}
          />
          <Theinput
            label="Buy Price"
            placeholder="Instrument"
            state={quantity}
            setstate={setquantity}
          />
        </div>
      </Layout>
    </>
  );
}

export default Dashboard;
