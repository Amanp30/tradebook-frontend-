import React, { useState } from "react";
import Brokerage from "./components/AnotherBrokerage";
import Layout from "./components/Layout";
import Theinput from "./components/Theinput";
import { brokerdata } from "./helpers/brokerdata";
import Stock from "./components/Forbrokerages";

function Dashboard() {
  const [instrument, setinstrument] = useState("");
  const [quantity, setquantity] = useState(0);
  const [entryprice, setentryprice] = useState(0);
  const [exitprice, setexitprice] = useState(0);
  const [fees, setfees] = useState(0);

  const [broker, setBroker] = useState("upstox");
  const [action, setaction] = useState("Sell");

  const handleBrokerChange = (event) => {
    setBroker(event.target.value);
  };
  const handleAction = (event) => {
    setaction(event.target.value);
  };

  const brokerInfo = brokerdata[broker.toLowerCase()]; // Get the brokerage and stt based on the broker name

  // var thetrio = quantity && entryprice && exitprice;
  // if (!thetrio) {
  //   setfees(0);
  // }

  const mystock = new Stock({
    action: action,
    quantity: quantity,
    entry: entryprice,
    exit: exitprice,
    brokerage: brokerInfo.brokerage,
    transactioncharges: brokerInfo.transactioncharges,
  });

  console.log("Profit " + mystock.profit);
  console.log("gain percent " + mystock.gainpercent);
  console.log("pnl per share " + mystock.pnlpershare);
  console.log("Charges " + mystock.totaltaxes);
  console.log("net pnl " + mystock.netpnl);
  console.log("breakeven " + mystock.breakeven);

  const handleform = (e) => {
    e.preventDefault();

    var form = document.getElementById("theform");
    var data = new FormData(form);

    data.append("quantity", quantity);
    data.append("entryprice", entryprice);
    data.append("exitprice", exitprice);
    data.append("fees", fees);
    data.append("symbol", instrument);
    data.append("brokerage", mystock.brokerage);
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
        <label htmlFor="action">Action:</label>
        <select
          id="action"
          defaultValue={action}
          value={action}
          onChange={handleAction}
        >
          <option value="Buy">Buy</option>
          <option value="Sell">Sell </option>
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
              label="Entry Price"
              placeholder="Entry price"
              state={entryprice}
              setstate={setentryprice}
            />
            <Theinput
              type="number"
              label="Exit  Price"
              placeholder=""
              state={exitprice}
              setstate={setexitprice}
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
                taxes={mystock.totaltaxes}
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
