import React, { useState } from "react";
import Brokerage from "./components/Brokerage";
import Layout from "./components/Layout";
import Theinput from "./components/Theinput";

function Dashboard() {
  const [instrument, setinstrument] = useState("");
  const [quantity, setquantity] = useState(0);
  const [buyprice, setbuyprice] = useState(0);
  const [sellprice, setsellprice] = useState(0);
  const [fees, setfees] = useState(0);

  return (
    <>
      <Layout>
        <div className="dashboardclass thebox">
          <Theinput
            type="number"
            label="Quantity"
            placeholder="Instrument"
            state={quantity}
            setstate={setquantity}
          />
          <Theinput
            type="number"
            label="Buy Price"
            placeholder=""
            state={buyprice}
            setstate={setbuyprice}
          />
          <Theinput
            type="number"
            label="Sell Price"
            placeholder=""
            state={sellprice}
            setstate={setsellprice}
          />

          <Theinput
            type="text"
            label="Symbol   or instrument"
            placeholder="Instrument"
            state={instrument}
            setstate={setinstrument}
            className="hasicon"
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
            type="color"
            label="Color"
            placeholder="Instrument"
            state={quantity}
            setstate={setquantity}
          />
          <Theinput
            type="tel"
            label="Telephone"
            placeholder="Instrument"
            state={quantity}
            setstate={setquantity}
          />
          <Theinput
            type="time"
            label="Time"
            placeholder="Instrument"
            state={quantity}
            setstate={setquantity}
          />
          <Theinput
            type="url"
            label="Url "
            placeholder="Instrument"
            state={quantity}
            setstate={setquantity}
          />
          <Theinput
            type="week"
            label="Week"
            placeholder="Instrument"
            state={quantity}
            setstate={setquantity}
          />
          <Theinput
            type="search"
            label="Search"
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
            type="number"
            label="fee"
            placeholder="Instrument"
            state={fees}
            setstate={setfees}
            className="hasfee"
          >
            <Brokerage
              buyprice={buyprice}
              sellprice={sellprice}
              quantity={quantity}
              setstate={setfees}
            />
          </Theinput>
        </div>
      </Layout>
    </>
  );
}

export default Dashboard;
