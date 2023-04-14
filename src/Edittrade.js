import React, { useEffect, useState } from "react";
import Brokerage from "./components/AnotherBrokerage";
import Layout from "./components/Layout";
import Theinput from "./components/Theinput";
import { brokerdata } from "./helpers/brokerdata";
import Stock from "./components/Forbrokerages";
import Theselect from "./components/Select";
import Symbolinput from "./components/Symbol";
import moment from "moment-timezone";
import "./tradeform.css";
import Thedate from "./components/Date";
import { getBroker } from "./helpers/Auth";
import useNotify from "./hooks/useNotify";
import Notification from "./components/Notification";
import { errorhandler, validateOrder } from "./helpers/codehandlers";
import {
  Chartexplain,
  Formdiv,
  Servererror,
  Waiting,
  Heading,
} from "./components/Littles";
import { Timeout, validateSymbol } from "./helpers/functions";
import useTrade from "./hooks/useTrade";
import { editTradeapi, updateTradeapi } from "./services/apiEndpoints";
import { useParams } from "react-router-dom";

function Edittrade() {
  const { tradeid } = useParams();

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

  const [values, setvalues] = useState([]);
  const [shouldMountChart, setShouldMountChart] = useState(false);

  useEffect(() => {
    editTradeapi(tradeid)
      .then((response) => {
        const { chart } = response;
        response.chart =
          chart === "" ? "" : `${REACT_APP_API}/uploads/${chart}`;
        setvalues(response);
        setTimeout(() => {
          setShouldMountChart(true); // update shouldMount to true after 3 seconds
        }, 500);
      })
      .catch((error) => {
        setShouldMountChart("servererror");
        errorhandler(error, setmessage).then(() => {
          setnotifyerror(true);
        });
      });
  }, []);

  // console.log(values);

  const broker = getBroker();
  const brokerInfo = brokerdata[broker.toLowerCase()]; // Get the brokerage and stt based on the broker name

  const mystock = new Stock({
    action: values.action,
    quantity: values.quantity,
    entry: values.entryprice,
    exit: values.exitprice,
    brokerage: brokerInfo.brokerage,
    transactioncharges: brokerInfo.transactioncharges,
    entrytime: values.entrydate,
    exittime: values.exitdate,
    stoploss: values.stoploss,
    takeprofit: values.takeprofit,
  });

  const handleform = (e) => {
    e.preventDefault();

    clearnotification();

    const fields = [
      { name: "symbol or instrument", value: values.symbol },
      { name: "quantity", value: values.quantity },
      { name: "entry price", value: values.entryprice },
      { name: "exit price", value: values.exitprice },
      { name: "fees", value: values.fees },
      { name: "entry date", value: values.entrydate },
      { name: "exit date", value: values.exitdate },
      { name: "Take profit", value: values.takeprofit },
      { name: "Stoploss", value: values.stoploss },
    ];

    if (
      validateSymbol(
        values?.symbol?.trim(),
        setvalues({ ...values, symbol: values?.symbol })
      )
    ) {
      // alert("Symbol have spaces else special char ");
      return false;
    }

    if (values.entrydate > values.exitdate) {
      setmessage("Entry date must be less than Exit date");
      setnotifyerror(true);
      return;
    }

    if (Array.isArray(values.chart) && values.chart.length === 0) {
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
      values.action,
      values.entryprice,
      values.takeprofit,
      values.stoploss,
      setmessage,
      setnotifyerror
    );

    if (is) {
      return;
    }

    var form = document.getElementById("theform");
    var data = new FormData(form);

    if (typeof values.chart === "string" && values.chart.includes("uploads/")) {
      console.log("have uploads");
      data.append("chart", values.chart?.split("uploads/")[1]);
    } else if (typeof values.chart === "object" && values.chart !== null) {
      console.log("is object");
      data.append("chart", values.chart);
    } else if (typeof values.chart === "string" && values.chart === "") {
      console.log("file removed");
      data.append("chart", values.chart);
    }

    // data.append("user", getUserId());
    data.append("quantity", values.quantity);
    data.append("emotions", values.emotions);
    data.append("stoploss", values.stoploss);
    data.append("takeprofit", values.takeprofit);
    data.append("timeframe", values.timeframe);
    data.append("marketcondition", values.marketcondition);
    data.append("action", values.action);
    data.append("entryprice", values.entryprice);
    data.append("exitprice", values.exitprice);
    data.append("entrydate", values.entrydate);
    data.append("exitdate", values.exitdate);
    data.append("fees", values.fees);
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

    delete values._id;

    for (const [key, value] of data.entries()) {
      formDataObj[key] = value;
    }

    updateTradeapi(tradeid, data)
      .then((response) => {
        // setmessage(response.data.message);
        setmessage("Trade updated successfully");
        setnotifysuccess(true);
        // console.log(response.data);
        Timeout("/trades", 2000);
      })
      .catch((error) => {
        console.log(error);
        errorhandler(error, setmessage).then(() => {
          setnotifyerror(true);
        });
      });

    // console.table(formDataObj);
  };

  if (shouldMountChart === false) {
    return (
      <>
        <Layout>
          <Waiting />
        </Layout>
      </>
    );
  }

  if (shouldMountChart === "servererror") {
    return (
      <>
        <Layout>
          <Servererror />
        </Layout>
      </>
    );
  }

  if (shouldMountChart)
    return (
      <>
        <Layout>
          <form
            onSubmit={handleform}
            id="theform"
            method="post"
            encType="multipart/form-data"
          >
            <Heading text={`Edit Trade`} theclass="wrapper head class">
              <button type="submit" className="primarybtn">
                Update
              </button>
            </Heading>
            <div className="newtradeform thebox">
              <Formdiv text="General Data">
                <Symbolinput
                  label="Symbol"
                  name="symbol"
                  showlabel
                  state={values.symbol}
                  setstate={(value) => setvalues({ ...values, symbol: value })}
                  data={symboldata}
                  limit={10}
                  placeholder="Ex. PNB"
                  uppercase
                />

                <Theselect
                  label="Action"
                  options={["Buy", "Sell"]}
                  state={values.action}
                  setState={(value) => setvalues({ ...values, action: value })}
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
                  state={values.timeframe}
                  setState={(value) =>
                    setvalues({ ...values, timeframe: value })
                  }
                />
              </Formdiv>
              <Formdiv text="Entry">
                {" "}
                <Theinput
                  label="Entry Date"
                  type="datetime-local"
                  state={moment(values.entrydate).format("YYYY-MM-DDTHH:mm:ss")}
                  setstate={(value) =>
                    setvalues({ ...values, entrydate: value })
                  }
                />
                <Theinput
                  type="number"
                  label="Quantity"
                  placeholder="Quantity"
                  state={values.quantity}
                  setstate={(value) =>
                    setvalues({ ...values, quantity: value })
                  }
                />
                <Theinput
                  type="number"
                  label="Entry Price"
                  placeholder="Entry price"
                  state={values.entryprice}
                  setstate={(value) =>
                    setvalues({ ...values, entryprice: value })
                  }
                />{" "}
                <Theinput
                  type="number"
                  label="Take Profit"
                  placeholder=""
                  state={values.takeprofit}
                  setstate={(value) =>
                    setvalues({ ...values, takeprofit: value })
                  }
                />
                <Theinput
                  type="number"
                  label="Stop Loss"
                  placeholder=""
                  state={values.stoploss}
                  setstate={(value) =>
                    setvalues({ ...values, stoploss: value })
                  }
                />
              </Formdiv>
              <Formdiv text="Exit">
                <Thedate
                  label="Exit date"
                  type="datetime-local"
                  state={moment(values.exitdate).format("YYYY-MM-DDTHH:mm:ss")}
                  setstate={(value) =>
                    setvalues({ ...values, exitdate: value })
                  }
                  // min={"2023-05-17T18:29"}
                  // max={"2024-05-22T18:29"}
                />
                <Theinput
                  type="number"
                  label="Exit Price"
                  placeholder=""
                  state={values.exitprice}
                  setstate={(value) =>
                    setvalues({ ...values, exitprice: value })
                  }
                />{" "}
                <Theinput
                  type="number"
                  label="Fees"
                  placeholder="Instrument"
                  state={values.fees}
                  setstate={(value) => setvalues({ ...values, fees: value })}
                  className="hasfee"
                >
                  <Brokerage
                    broker={broker}
                    taxes={mystock.totaltaxes}
                    setstate={(value) => setvalues({ ...values, fees: value })}
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
                  state={values.emotions}
                  setState={(value) =>
                    setvalues({ ...values, emotions: value })
                  }
                />
                <Theselect
                  label="Market Conditions"
                  options={["", "Trending", "Flat"]}
                  state={values.marketcondition}
                  setState={(value) =>
                    setvalues({ ...values, marketcondition: value })
                  }
                />
              </Formdiv>
              <Formdiv text="Chart">
                {shouldMountChart ? (
                  <Chartexplain
                    chart={values.chart}
                    setchart={(value) => setvalues({ ...values, chart: value })}
                    setmessage={setmessage}
                    seterror={setnotifyerror}
                  />
                ) : (
                  "loading"
                )}
              </Formdiv>
            </div>
          </form>
          <Notification
            text={message}
            error="topcenter"
            icon
            state={notifyerror}
            setstate={setnotifyerror}
            close
            // stripe
            // mobile
          />
          <Notification
            text={message}
            success="topcenter"
            icon
            state={notifysuccess}
            setstate={setnotifysuccess}
            close
            // stripe
            // mobile
          />
        </Layout>
      </>
    );
}

export default Edittrade;
