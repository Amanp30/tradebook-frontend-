import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "./components/Layout";
import {
  Editdeleteset,
  Imagezoom,
  Outcome,
  Servererror,
  Waiting,
} from "./components/Littles";
import { errorhandler } from "./helpers/codehandlers";
import { momentdate } from "./helpers/functions";
import useNotify from "./hooks/useNotify";
import { deleteTrade, editTradeapi } from "./services/apiEndpoints";

function Detailtrdae() {
  const { trade } = useParams();

  const [values, setvalues] = useState([]);
  const [showContent, setshowContent] = useState(false);

  const {
    clearnotification,
    notifysuccess,
    notifyerror,
    message,
    setnotifysuccess,
    setmessage,
    setnotifyerror,
  } = useNotify();

  function deleteOne(id) {
    clearnotification();
    deleteTrade(id)
      .then((response) => {
        console.log(response);
        window.location.href = "/trades";
      })
      .catch((error) => {
        errorhandler(error, setmessage).then(() => {
          setnotifyerror(true);
        });
      });
  }

  useEffect(() => {
    editTradeapi(trade)
      .then((response) => {
        const { chart } = response;
        response.chart =
          chart === ""
            ? ""
            : `${process.env.REACT_APP_DOMAIN}/uploads/${chart}`;
        setvalues(response);

        setshowContent(true);
      })
      .catch((error) => {
        setshowContent("servererror");
      });
  }, []);

  if (showContent === false) {
    return (
      <Layout>
        <Waiting />
      </Layout>
    );
  }
  if (showContent === "servererror") {
    return (
      <>
        <Layout>
          <Servererror />
        </Layout>
      </>
    );
  }

  console.log(values);
  if (showContent)
    return (
      <>
        <Layout>
          <div style={{ display: "flex", alignItems: "center" }}>
            {" "}
            <Link to={"/trades"}>
              <img
                src="/backarrow.svg"
                className="backimg"
                style={{
                  width: "30px",
                  height: "30px",
                  transform: "translateY(4px)",
                }}
              />
            </Link>
            <h1 style={{ marginLeft: "20px" }}>{values?.symbol}</h1>
          </div>
          <Editdeleteset id={values._id} deletefunc={(e) => deleteOne(e)} />

          <div className="detailgrid">
            <div className="detailone thebox thepad">
              <h2 className="">Trade Information</h2>
              <div className="flex onedetail">
                <p className="boldtext">Symbol</p>
                <p>{values.symbol ? values.symbol : "-"}</p>
              </div>
              <div className="flex onedetail">
                <p className="boldtext">Outcome</p>
                <Outcome text={values.outcome} />
              </div>

              <div className="flex onedetail">
                <p className="boldtext">Action</p>
                {values.action === "Buy" ? (
                  <p style={{ color: "green" }}>Buy</p>
                ) : (
                  <p style={{ color: "red" }}>Sell</p>
                )}
              </div>
              <div className="flex onedetail">
                <p className="boldtext">Timeframe</p>
                <p>{values.timeframe ? values.timeframe : "-"}</p>
              </div>

              <div className="flex onedetail">
                <p className="boldtext">Entry Date</p>
                <p>{values.entrydate ? momentdate(values.entrydate) : "-"}</p>
              </div>

              <div className="flex onedetail">
                <p className="boldtext">Quantity</p>
                <p>{values.quantity ? values.quantity : "-"}</p>
              </div>
              <div className="flex onedetail">
                <p className="boldtext">Entry Price</p>
                <p>{values.entryprice ? values.entryprice : "-"}</p>
              </div>
              <div className="flex onedetail">
                <p className="boldtext">Take Profit</p>
                <p>{values.takeprofit ? values.takeprofit : "-"}</p>
              </div>
              <div className="flex onedetail">
                <p className="boldtext">Stoploss</p>
                <p>{values.stoploss ? values.stoploss : "-"}</p>
              </div>
              <div className="flex onedetail">
                <p className="boldtext">Exit Date</p>
                <p>{values.exitdate ? momentdate(values.exitdate) : "-"}</p>
              </div>
              <div className="flex onedetail">
                <p className="boldtext">Exit Price</p>
                <p>{values.exitprice ? values.exitprice : "-"}</p>
              </div>
              <div className="flex onedetail">
                <p className="boldtext">Profit</p>
                <p>{values.profit ? values.profit : "-"}</p>
              </div>
              <div className="flex onedetail">
                <p className="boldtext">Fees</p>
                <p>{values.fees ? values.fees : "-"}</p>
              </div>
              <div className="flex onedetail">
                <p className="boldtext">Net PNL</p>
                <p>{values.netpnl ? values.netpnl : "-"}</p>
              </div>
              <div className="flex onedetail">
                <p className="boldtext">Market Condition</p>
                <p>{values.marketcondition ? values.marketcondition : "-"}</p>
              </div>
              <div className="flex onedetail">
                <p className="boldtext">Emotions</p>
                <p>{values.emotions ? values.emotions : "-"}</p>
              </div>
              <div className="flex onedetail">
                <p className="boldtext">RRR - Planned</p>
                <p>{values.rrrplanned ? values.rrrplanned : "-"}</p>
              </div>
              <div className="flex onedetail">
                <p className="boldtext">R Multiple</p>
                <p>{values.rmultiple ? values.rmultiple : "-"}</p>
              </div>
              <div className="flex onedetail">
                <p className="boldtext">R Multiple</p>
                <p>{values.rmultiple ? values.rmultiple : "-"}</p>
              </div>
              <div className="flex onedetail">
                <p className="boldtext">Results, %</p>
                <p>{values.returnpercent ? `${values.returnpercent}%` : "-"}</p>
              </div>
              <div className="flex onedetail">
                <p className="boldtext">Duration</p>
                <p>{values.holdingperiod ? `${values.holdingperiod}` : "-"}</p>
              </div>
              <div className="flex onedetail">
                <p className="boldtext">Profit Per Share</p>
                <p>{values.pnlpershare ? `${values.pnlpershare}` : "-"}</p>
              </div>
            </div>
            <div className="detailtwo thebox thepad">
              {values.chart ? (
                <>
                  <h2>Chart Image</h2>
                  <Imagezoom theimage={values.chart} />
                </>
              ) : null}
              <h2>Notes</h2>
              <textarea className="detailtext"></textarea>
            </div>
          </div>
        </Layout>
      </>
    );
}

export default Detailtrdae;
