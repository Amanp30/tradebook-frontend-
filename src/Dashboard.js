import React, { useState } from "react";
import Brokerage from "./components/AnotherBrokerage";
import Layout from "./components/Layout";
import Theinput from "./components/Theinput";

function Dashboard() {
  const [instrument, setinstrument] = useState("");
  const [quantity, setquantity] = useState(0);
  const [buyprice, setbuyprice] = useState(0);
  const [sellprice, setsellprice] = useState(0);
  const [fees, setfees] = useState(0);

  const [broker, setBroker] = useState("upstox");

  const handleBrokerChange = (event) => {
    setBroker(event.target.value);
  };

  const handleform = (e) => {
    e.preventDefault();

    var form = document.getElementById("theform");
    var data = new FormData(form);

    data.append("quantity", quantity);
    data.append("buyprice", buyprice);
    data.append("sellprice", sellprice);
    data.append("fees", fees);
    data.append("symbol", instrument);
    var formDataObj = {};

    for (const [key, value] of data.entries()) {
      formDataObj[key] = value;
    }

    console.log(formDataObj);
  };

  return (
    <>
      <Layout>
        <label htmlFor="brokerSelect">Select broker:</label>
        <select
          id="brokerSelect"
          defaultValue={broker}
          value={broker}
          onChange={handleBrokerChange}
        >
          <option value="upstox">Upstox</option>
          <option value="zerodha">Zerodha</option>
          <option value="angelone">Angel One</option>
        </select>
        <p>{fees}</p>
        <form onSubmit={handleform} id="theform">
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
              type="number"
              label="Fees"
              placeholder="Instrument"
              state={fees}
              setstate={setfees}
              className="hasfee"
            >
              <Brokerage
                broker={broker}
                buyprice={buyprice}
                sellprice={sellprice}
                quantity={quantity}
                setstate={setfees}
              />
            </Theinput>
          </div>
          <input type="submit" />
        </form>
      </Layout>
    </>
  );
}

export default Dashboard;
