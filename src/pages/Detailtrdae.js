import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { Link, useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import {
  Editdeleteset,
  Fullwindowbackground,
  Greenred,
  Imagezoom,
  Notesviewer,
  Outcome,
  Servererror,
  Waiting,
} from "../components/Littles";
import { errorhandler } from "../helpers/codehandlers";
import { momentdate } from "../helpers/functions";
import useNotify from "../hooks/useNotify";
import {
  addNewNote,
  deleteoneNote,
  deleteTrade,
  editTradeapi,
  oneTradeview,
  updateoneNote,
} from "../services/apiEndpoints";

function Popupinput({ note, setnote, updateFunction, tradeid }) {
  const [newNote, setnewNote] = useState(note);
  // console.log(note);

  return (
    <>
      {note && typeof note.note === "string" ? (
        <Fullwindowbackground className="updateSymbol">
          {/* <h3 style={{ color: "black" }}>Edit Symbol Name</h3> */}
          <h3>Edit Note</h3>
          <textarea
            className="detailtext textareawidth"
            value={newNote.note}
            onChange={(e) => setnewNote({ note: e.target.value })}
          />
          <div className="flexend btngroup">
            <button
              className="cancelbtn"
              onClick={(e) => setnote({ note: null })}
            >
              Cancel
            </button>
            <button
              className="primarybtn"
              onClick={(e) =>
                updateFunction(tradeid, {
                  noteindex: note.index,
                  note: newNote.note,
                })
              }
            >
              Update
            </button>
          </div>
        </Fullwindowbackground>
      ) : null}
    </>
  );
}

function Detailtrdae() {
  const { trade } = useParams();
  const navigate = useNavigate();

  const [thenavgourl, setThenavgourl] = useState("");

  var theurlarray = useSelector((state) => state?.Previousurls);
  var secondlasturl = theurlarray[theurlarray.length - 2];

  useEffect(() => {
    if (secondlasturl?.includes("trades")) {
      var splited = secondlasturl?.split("/");
      setThenavgourl(`/${splited[3]}`);
    } else if (secondlasturl?.includes("report")) {
      var hellosplit = secondlasturl?.split("/");
      setThenavgourl(`/${hellosplit.slice(3).join("/")}`);
    } else {
      setThenavgourl("/trades");
    }
  }, [secondlasturl]);

  const [values, setvalues] = useState([]);
  const [showContent, setshowContent] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [note, setnote] = useState({ index: null, note: null });

  const {
    clearnotification,
    notifysuccess,
    notifyerror,
    message,
    setnotifysuccess,
    setmessage,
    setnotifyerror,
  } = useNotify();

  function handleTextareaChange(event) {
    setTextareaValue(event.target.value);
  }

  function newNote(tradeid, data) {
    addNewNote(tradeid, { note: data })
      .then((response) => {
        // console.log(response);
        setmessage(response?.message);
        setnotifysuccess(true);
        setvalues({ ...values, notes: response.notes });
        setTextareaValue("");
      })
      .catch((error) => {
        setmessage("Unable to add note");
        setnotifyerror(true);
        console.log(error);
      });
  }
  function updateNote(tradeid, data) {
    updateoneNote(tradeid, data)
      .then((response) => {
        console.log(response);
        setmessage(response?.message);
        setnotifysuccess(true);
        setvalues({ ...values, notes: response.notes });
        setTextareaValue("");
        setnote({ note: null });
      })
      .catch((error) => {
        setmessage("Unable to add note");
        setnotifyerror(true);
        console.log(error);
      });
  }

  function deleteNote(tradeid, data) {
    deleteoneNote(tradeid, { index: data })
      .then((response) => {
        // console.log(response);
        setmessage(response?.message);
        setnotifysuccess(true);
        setvalues({ ...values, notes: response.notes });
      })
      .catch((error) => {
        setmessage("Unable to add note");
        setnotifyerror(true);
        console.log(error);
      });
  }

  function deleteoneTrade(id) {
    clearnotification();
    deleteTrade(id)
      .then((response) => {
        // console.log(response);
        setmessage("Trade Deleted");
        setnotifysuccess(true);
        setTimeout(() => {
          navigate(thenavgourl);
        }, 2000);
      })
      .catch((error) => {
        errorhandler(error, setmessage).then(() => {
          setnotifyerror(true);
        });
      });
  }

  useEffect(() => {
    oneTradeview(trade)
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
        <Layout
          message={message}
          success={notifysuccess}
          setsuccess={setnotifysuccess}
          error={notifyerror}
          seterror={setnotifyerror}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1em",
              flexWrap: "wrap",
            }}
          >
            <Link to={thenavgourl}>
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
            <h1 style={{ marginLeft: "20px", marginRight: "20px" }}>
              {values?.symbol}
            </h1>
            <Outcome text={values.outcome} />
          </div>
          <Editdeleteset
            id={values._id}
            deletefunc={(e) => deleteoneTrade(e)}
          />
          <div className="detailgrid">
            <div className="detailone thebox thepad">
              <h2 style={{ marginBottom: "20px" }}>
                <img
                  src="/infoicon.svg"
                  style={{ width: "22px", marginRight: "10px" }}
                />
                Trade Information
              </h2>
              <div className="detailheading">General Data</div>
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
              <div className="detailheading">Trade Entry</div>

              <div className="flex onedetail">
                <p className="boldtext">Entry Date</p>
                <p>{values.entrydate ? momentdate(values.entrydate) : "-"}</p>
              </div>

              <div className="flex onedetail">
                <p className="boldtext">Trading System</p>
                <Link
                  to={`/trading-system/view/${values.tradingsystem._id}`}
                  style={{ textDecoration: "underline" }}
                >
                  {values.tradingsystem.systemname}
                </Link>
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
              <div className="detailheading">Trade Exit</div>

              <div className="flex onedetail">
                <p className="boldtext">Exit Date</p>
                <p>{values.exitdate ? momentdate(values.exitdate) : "-"}</p>
              </div>
              <div className="flex onedetail">
                <p className="boldtext">Exit Price</p>
                <p>{values.exitprice ? values.exitprice : "-"}</p>
              </div>
              <div className="detailheading">Trade Results</div>
              <div className="flex onedetail">
                <p className="boldtext">Profit Per Share</p>
                <p>{values.pnlpershare ? `${values.pnlpershare}` : "-"}</p>
              </div>
              <div className="flex onedetail">
                <p className="boldtext">Results, %</p>
                {values.returnpercent ? (
                  <Greenred number={values.returnpercent} append="%" />
                ) : (
                  "-"
                )}
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
                {values.netpnl ? (
                  <Greenred number={values.netpnl} append=" INR" />
                ) : (
                  "-"
                )}
              </div>
              <div className="detailheading">Other Details</div>

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
                <p className="boldtext">Duration</p>
                <p>{values.holdingperiod ? `${values.holdingperiod}` : "-"}</p>
              </div>
            </div>
            <div className="detailtwo thebox thepad">
              {values.chart ? (
                <>
                  <h2>Chart Image</h2>
                  <Imagezoom theimage={values.chart} />
                </>
              ) : null}
              <h2>Notes</h2>{" "}
              <Notesviewer
                data={values.notes}
                tradeid={values._id}
                deleteFunction={deleteNote}
                setnote={setnote}
              />
              <textarea
                className="detailtext"
                placeholder="Write note for this trade"
                value={textareaValue}
                onChange={handleTextareaChange}
              />
              <button
                className="primarybtn"
                onClick={(e) => newNote(values._id, textareaValue)}
                disabled={!textareaValue ? true : false}
              >
                ADD NOTE
              </button>
              {typeof note.note === "string" && (
                <Popupinput
                  note={note}
                  setnote={setnote}
                  updateFunction={updateNote}
                  tradeid={values._id}
                />
              )}
            </div>
          </div>
        </Layout>
      </>
    );
}

export default Detailtrdae;
