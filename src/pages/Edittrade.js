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
import Thedate from "../components/inputs/Date";
import { getBroker } from "../helpers/Auth";
import useNotify from "../hooks/useNotify";
import { errorhandler, validateOrder } from "../helpers/codehandlers";
import { Chartexplain, Formdiv, Heading } from "../components/Littles";
import { validateSymbol } from "../helpers/functions";
import useTrade from "../hooks/useTrade";
import { editTradeapi, updateTradeapi } from "../services/apiEndpoints";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import Errorui from "../components/Errorui";

function Edittrade() {
  const { tradeid } = useParams();
  const navigate = useNavigate();

  const {
    clearnotification,
    notifysuccess,
    notifyerror,
    message,
    setnotifysuccess,
    setmessage,
    setnotifyerror,
  } = useNotify();

  const [values, setvalues] = useState([]);
  const [showContent, setshowContent] = useState(false);
  const [contentChange, setcontentChange] = useState(false);

  const { symboldata } = useTrade(false);

  useEffect(() => {
    editTradeapi(tradeid)
      .then((response) => {
        console.log(response);
        const { chart } = response;
        response.chart =
          chart === ""
            ? ""
            : `${process.env.REACT_APP_DOMAIN}/uploads/${chart}`;
        setvalues(response);
        setTimeout(() => {
          setshowContent(true); // update shouldMount to true after 3 seconds
        }, 500);
      })
      .catch((error) => {
        setshowContent("servererror");
        errorhandler(error, setmessage).then(() => {
          setnotifyerror(true);
        });
      });
  }, []);

  // console.log(values);

  const broker = getBroker();
  const brokerInfo = brokerdata[broker.toLowerCase().replace(/\s/g, "")]; // Get the brokerage and stt based on the broker name

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

  const [thenavgourl, setThenavgourl] = useState("");

  var theurlarray = useSelector((state) => state?.Previousurls);
  var lasturl = theurlarray[theurlarray.length - 1];
  var secondlasturl = theurlarray[theurlarray.length - 2];
  var thirdlasturl = theurlarray[theurlarray.length - 3];

  useEffect(() => {
    if (secondlasturl?.includes("trades")) {
      var splited = secondlasturl?.split("/");
      setThenavgourl(`/${splited[3]}`);
    } else if (secondlasturl?.includes("detail")) {
      var hellosplit = thirdlasturl?.split("/");
      console.log(hellosplit);
      setThenavgourl(`/${hellosplit.slice(3).join("/")}`);
    } else {
      setThenavgourl("/trades");
    }
  }, [secondlasturl, thirdlasturl]);

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
    data.append("tradingsystem", values.tradingsystem);
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
    data.append("holdingperiod", mystock.holdingPeriodminute);
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
        console.log(thenavgourl);
        setTimeout(() => {
          navigate(thenavgourl);
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
  // useEffect(() => {
  //   window.addEventListener("popstate", function (event) {
  //     if (contentChange) {
  //       var answer = window.confirm("Are you sure you want to go back?");
  //       answer && event.preventDefault();
  //     }
  //   });
  // }, []);

  return (
    <>
      <Layout
        message={message}
        success={notifysuccess}
        setsuccess={setnotifysuccess}
        error={notifyerror}
        seterror={setnotifyerror}
      >
        {" "}
        <Errorui showContent={showContent}>
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
                  state={values?.symbol}
                  setstate={(value) => setvalues({ ...values, symbol: value })}
                  data={symboldata?.symbols}
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
                <Theselect
                  label="System"
                  state={values.tradingsystem}
                  setState={(value) =>
                    setvalues({ ...values, tradingsystem: value })
                  }
                  options={symboldata?.systemNames}
                  ids={symboldata?.systemIds}
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
                  step=".01"
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
                <Chartexplain
                  chart={values.chart}
                  setchart={(value) => setvalues({ ...values, chart: value })}
                  setmessage={setmessage}
                  seterror={setnotifyerror}
                />
              </Formdiv>
            </div>
          </form>
        </Errorui>
      </Layout>
    </>
  );
}

export default Edittrade;
