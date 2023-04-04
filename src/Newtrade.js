import React, { useEffect, useState } from "react";
import Brokerage from "./components/AnotherBrokerage";
import Layout from "./components/Layout";
import Theinput from "./components/Theinput";
import { brokerdata } from "./helpers/brokerdata";
import Stock from "./components/Forbrokerages";
import Heading from "./components/Heading";
import Theselect from "./components/Select";
import Symbolinput from "./components/Symbol";
import moment from "moment-timezone";
import "./tradeform.css";

function Newtrade() {
  const [instrument, setinstrument] = useState("hdfc");
  const [quantity, setquantity] = useState(0);
  const [entryprice, setentryprice] = useState(0);
  const [exitprice, setexitprice] = useState(0);
  const [fees, setfees] = useState(0);
  const [entrydate, setentrydate] = useState("");
  const [exitdate, setexitdate] = useState("2023-04-03");

  // var xdate = new Date();
  /*  var xdate = "2023-04-11T16:23:00.000Z";
  var momentDate = moment.utc(xdate).local();
  var formattedDate = momentDate.format("YYYY-MM-DD");
  console.log(formattedDate); */

  var dateString = "2023-04-03T11:56";
  var momentDate = moment.utc(dateString).tz("Asia/Kolkata");
  var formattedDate = momentDate.format("YYYY-MM-DDTHH:mm");
  console.log(formattedDate);

  useEffect(() => setentrydate(formattedDate), []);

  const [broker, setBroker] = useState("Angelone");
  const [action, setaction] = useState("Sell");

  var data = [
    "RELIANCE",
    "TATASTEEL",
    "HDFCBANK",
    "ICICIBANK",
    "HINDUNILVR",
    "INFY",
    "KOTAKBANK",
    "BHARTIARTL",
    "HCLTECH",
    "ITC",
    "AXISBANK",
    "WIPRO",
    "BAJFINANCE",
    "ULTRACEMCO",
    "TITAN",
    "ASIANPAINT",
    "NESTLEIND",
    "SBIN",
    "MARUTI",
    "ONGC",
    "BANKBARODA",
    "NTPC",
    "TECHM",
    "SUNPHARMA",
    "INDUSINDBK",
    "LT",
    "DRREDDY",
    "POWERGRID",
    "IOC",
    "TATAPOWER",
    "CIPLA",
    "TATAMOTORS",
    "M&M",
    "GAIL",
    "EICHERMOT",
    "JSWSTEEL",
    "BAJAJFINSV",
    "HEROMOTOCO",
    "BAJAJ-AUTO",
    "ONGC",
    "UBL",
    "HDFCLIFE",
    "TATACONSUM",
    "BAJAJHLDNG",
    "MRF",
    "BPCL",
    "PIDILITIND",
    "GRASIM",
    "INDIGO",
    "HDFCAMC",
  ];

  // const handleAction = (event) => {
  //   setaction(event.target.value);
  // };

  const brokerInfo = brokerdata[broker.toLowerCase()]; // Get the brokerage and stt based on the broker name

  const mystock = new Stock({
    action: action,
    quantity: quantity,
    entry: entryprice,
    exit: exitprice,
    brokerage: brokerInfo.brokerage,
    transactioncharges: brokerInfo.transactioncharges,
  });

  const handleform = (e) => {
    e.preventDefault();

    const fields = [
      { name: "symbol or instrument", value: instrument },
      { name: "quantity", value: quantity },
      { name: "entry price", value: entryprice },
      { name: "exit price", value: exitprice },
      { name: "fees", value: fees },
      { name: "entry date", value: entrydate },
      { name: "exit date", value: exitdate },
    ];

    for (const field of fields) {
      if (!field.value) {
        alert(`Please enter ${field.name}`);
        return;
      }
    }

    var form = document.getElementById("theform");
    var data = new FormData(form);

    data.append("symbol", instrument);
    data.append("quantity", quantity);
    data.append("entryprice", entryprice);
    data.append("exitprice", exitprice);
    data.append("entrydate", entrydate);
    data.append("exitdate", exitdate);
    data.append("fees", fees);
    data.append("brokerage", mystock.brokerage);
    data.append("pnlpershare", mystock.pnlpershare);
    data.append("profit", mystock.profit);
    data.append("netpnl", mystock.netpnl);
    data.append("returnpercent", mystock.gainpercent);

    var formDataObj = {};

    for (const [key, value] of data.entries()) {
      formDataObj[key] = value;
    }

    console.log(formDataObj);
  };

  const Inlineheading = ({ children }) => {
    return (
      <>
        <h3 style={{ gridColumn: "1/-1", margin: "0 0 -12px 0px" }}>
          {children}
        </h3>
      </>
    );
  };

  return (
    <>
      <Layout>
        <form onSubmit={handleform} id="theform">
          <Heading text="Create new trade" theclass="wrapper head class">
            <input type="submit" />
          </Heading>
          <div className="newtradeform thebox">
            <Inlineheading>General Data</Inlineheading>
            <Symbolinput
              label="Symbol"
              name="symbol"
              showlabel
              state={instrument}
              setstate={(value) => setinstrument(value)}
              data={data}
              limit={5}
              placeholder="Ex. PNB"
              uppercase
            />
            <Theselect
              label="Action"
              options={["Buy", "Sell"]}
              state={action}
              setState={setaction}
            />
            <Theselect
              label="Broker"
              options={["Zerodha", "Angel one", "Upstox"]}
              state={broker}
              setState={setBroker}
            />
            <Inlineheading>Entry</Inlineheading>
            <Theinput
              label="Entry Date"
              type="datetime-local"
              state={entrydate}
              setstate={setentrydate}
            />
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
            />{" "}
            <Inlineheading>Exit</Inlineheading>
            <Theinput
              label="Exit Date"
              type="date"
              state={exitdate}
              setstate={setexitdate}
            />
            <Theinput
              type="number"
              label="Exit Price"
              placeholder=""
              state={exitprice}
              setstate={setexitprice}
            />
            <Inlineheading>Other</Inlineheading>
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
        </form>
      </Layout>
    </>
  );
}

export default Newtrade;
