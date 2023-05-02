import React, { useEffect, useState } from "react";
import Brokerage from "../components/AnotherBrokerage";
import Layout from "../components/Layout";
import Theinput from "../components/inputs/Theinput";
import { brokerdata } from "../helpers/brokerdata";
import Stock from "../components/Forbrokerages";
import Theselect from "../components/inputs/Select";
import Symbolinput from "../components/inputs/Symbol";
import moment from "moment-timezone";
import "../styles/tradeform.css";
import api from "../services/api";
import Thedate from "../components/inputs/Date";
import { getBroker, getUserId } from "../helpers/Auth";
import useNotify from "../hooks/useNotify";
import { errorhandler, validateOrder } from "../helpers/codehandlers";
import { Chartexplain, Formdiv, Heading } from "../components/Littles";
import { validateSymbol } from "../helpers/functions";
import useTrade from "../hooks/useTrade";
import { useNavigate } from "react-router-dom";

function Newtrade() {
  const navigate = useNavigate();

  const [instrument, setinstrument] = useState("");
  const [quantity, setquantity] = useState(0);
  const [entryprice, setentryprice] = useState(0);
  const [exitprice, setexitprice] = useState(0);
  const [fees, setfees] = useState(0);
  const [timeframe, settimeframe] = useState("1 Minute");
  const [emotions, setemotions] = useState("");
  const [marketcondition, setmarketcondition] = useState("");
  const [stoploss, setstoploss] = useState(0);
  const [takeprofit, settakeprofit] = useState(0);

  const [action, setaction] = useState("Buy");
  // const [chart, setchart] = useState(null);
  const [chart, setchart] = useState("");

  const [entrydate, setentrydate] = useState("");
  const [exitdate, setexitdate] = useState("2023-04-03");

  const now = moment().tz("Asia/Kolkata");

  // set entrydate to today's date at 9:00 AM
  now.set({ hour: 9, minute: 15, second: 0, millisecond: 0 });
  const theentrydate = now.format("YYYY-MM-DDTHH:mm");

  // set exitdate to today's date at 9:30 AM
  now.set({ hour: 10, minute: 30 });
  const theexitdate = now.format("YYYY-MM-DDTHH:mm");

  useEffect(() => setentrydate(theentrydate), []);
  useEffect(() => setexitdate(theexitdate), []);

  const {
    clearnotification,
    notifysuccess,
    notifyerror,
    message,
    setnotifysuccess,
    setmessage,
    setnotifyerror,
  } = useNotify();

  const { symboldata } = useTrade();

  // useEffect(() => {
  //   validateSymbol(instrument, setinstrument);
  // }, [instrument]);

  // console.log(typeof chart);

  const broker = getBroker();
  const brokerInfo = brokerdata[broker.toLowerCase().replace(/\s/g, "")]; // Get the brokerage and stt based on the broker name

  const mystock = new Stock({
    action: action,
    quantity: quantity,
    entry: entryprice,
    exit: exitprice,
    brokerage: brokerInfo.brokerage,
    transactioncharges: brokerInfo.transactioncharges,
    entrytime: entrydate,
    exittime: exitdate,
    stoploss: stoploss,
    takeprofit: takeprofit,
  });

  const handleform = (e) => {
    e.preventDefault();

    clearnotification();

    const fields = [
      { name: "symbol or instrument", value: instrument },
      { name: "quantity", value: quantity },
      { name: "entry price", value: entryprice },
      { name: "exit price", value: exitprice },
      { name: "fees", value: fees },
      { name: "entry date", value: entrydate },
      { name: "exit date", value: exitdate },
      { name: "Take profit", value: takeprofit },
      { name: "Stoploss", value: stoploss },
    ];

    if (validateSymbol(instrument, setinstrument)) {
      // alert("Symbol have spaces else special char ");
      return false;
    }

    if (entrydate > exitdate) {
      setmessage("Entry date must be less than Exit date");
      setnotifyerror(true);
      return;
    }

    if (Array.isArray(chart) && chart.length === 0) {
      alert("Please select an image file");
      return;
    }

    for (const field of fields) {
      if (!field.value) {
        alert(`Please enter ${field.name}`);
        return;
      }
    }

    var is = validateOrder(
      action,
      entryprice,
      takeprofit,
      stoploss,
      setmessage,
      setnotifyerror
    );

    if (is) {
      return;
    }

    var form = document.getElementById("theform");
    var data = new FormData(form);

    data.append("chart", chart);
    data.append("user", getUserId());

    // data.append("symbol", instrument);
    data.append("quantity", quantity);
    data.append("emotions", emotions);
    data.append("stoploss", stoploss);
    data.append("takeprofit", takeprofit);
    data.append("timeframe", timeframe);
    data.append("marketcondition", marketcondition);
    data.append("action", action);
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
    data.append("outcome", mystock.outcome);
    data.append("holdingperiod", mystock.holdingPeriodhour);
    data.append("rmultiple", mystock.rmultiple);
    data.append("rrrplanned", mystock.rrrplanned);
    data.append("rmultipledifference", mystock.rmultipledifference);

    var formDataObj = {};

    for (const [key, value] of data.entries()) {
      formDataObj[key] = value;
    }

    api
      .post("/trade/add", data)
      .then((response) => {
        setmessage(response.data.message);
        setnotifysuccess(true);
        setTimeout(() => {
          navigate("/trades");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        errorhandler(error, setmessage).then(() => {
          setnotifyerror(true);
        });
      });

    // console.table(formDataObj);
  };

  return (
    <>
      {/* <Layout> */}
      <Layout
        message={message}
        success={notifysuccess}
        setsuccess={setnotifysuccess}
        error={notifyerror}
        seterror={setnotifyerror}
      >
        {" "}
        <form
          onSubmit={handleform}
          id="theform"
          method="post"
          encType="multipart/form-data"
        >
          <Heading text="Create new trade" theclass="wrapper head class">
            <button type="submit" className="primarybtn">
              Save
            </button>
          </Heading>
          <div className="newtradeform thebox">
            <Formdiv text="General Data">
              <Symbolinput
                label="Symbol"
                name="symbol"
                showlabel
                state={instrument}
                setstate={(value) => setinstrument(value)}
                data={symboldata}
                limit={10}
                placeholder="Ex. INDUSINDBK"
                uppercase
              />
              <Theselect
                label="Action"
                options={["Buy", "Sell"]}
                state={action}
                setState={setaction}
              />
              <Theselect
                label="Timeframe"
                options={[
                  "1 Minute",
                  "5 Minutes",
                  "15 Minutes",
                  "30 Minutes",
                  "1 Hour",
                  "4 Hours",
                  "1 Day",
                  "1 Week",
                ]}
                state={timeframe}
                setState={settimeframe}
              />
            </Formdiv>
            <Formdiv text="Entry">
              {" "}
              <Theinput
                label="Entry Date"
                type="datetime-local"
                state={entrydate}
                setstate={setentrydate}
              />
              <Theinput
                type="number"
                label="Quantity"
                placeholder="0"
                state={quantity}
                setstate={setquantity}
              />
              <Theinput
                type="number"
                label="Entry Price"
                placeholder="0"
                state={entryprice}
                setstate={setentryprice}
              />{" "}
              <Theinput
                type="number"
                label="Take Profit"
                placeholder="0"
                state={takeprofit}
                setstate={settakeprofit}
              />
              <Theinput
                type="number"
                label="Stop Loss"
                placeholder="0"
                state={stoploss}
                setstate={setstoploss}
              />
            </Formdiv>
            <Formdiv text="Exit">
              <Thedate
                label="Exit date"
                type="datetime-local"
                state={exitdate}
                setstate={setexitdate}
                // min={"2023-05-17T18:29"}
                // max={"2024-05-22T18:29"}
              />
              <Theinput
                type="number"
                label="Exit Price"
                placeholder="0"
                state={exitprice}
                setstate={setexitprice}
              />{" "}
              <Theinput
                type="number"
                label="Fees"
                placeholder="You can click on suggested or enter mannually"
                state={fees}
                setstate={setfees}
                className="hasfee"
                step=".01"
              >
                <Brokerage
                  broker={broker}
                  taxes={mystock.totaltaxes}
                  setstate={setfees}
                />
              </Theinput>
            </Formdiv>
            <Formdiv text="Other information">
              <Theselect
                label="Emotions"
                options={[
                  "",
                  "Impatience",
                  "Fear",
                  "Tilt",
                  "Greed",
                  "Confidence",
                  "Uncertanity",
                ]}
                state={emotions}
                setState={setemotions}
              />
              <Theselect
                label="Market Conditions"
                options={["", "Trending", "Flat"]}
                state={marketcondition}
                setState={setmarketcondition}
              />
            </Formdiv>
            <Formdiv text="Chart">
              <Chartexplain
                chart={chart}
                setchart={setchart}
                setmessage={setmessage}
                seterror={setnotifyerror}
              />
            </Formdiv>
          </div>
        </form>
      </Layout>
    </>
  );
}

export default Newtrade;
