import React, { useState, useEffect } from "react";
import { Oval, Radio } from "react-loader-spinner";
import { Link } from "react-router-dom";
import Theinput from "../components/inputs/Theinput";
import Theselect from "../components/inputs/Select";
import { getAccountUserDetails } from "../services/apiEndpoints";
import {
  formatNumber,
  getMonthNames,
  indianStates,
  momentsmall,
  monthNames,
} from "../helpers/functions";
import { v4 as uuidv4 } from "uuid";
import Layout from "./Layout";
import { Doughnutchart } from "./charts/Dougnutchart";

export const Heading = ({ text, children, theclass }) => {
  var wrapperclasses = theclass ? theclass + " heading_comp " : "heading_comp ";
  return (
    <div className={wrapperclasses}>
      <h1 className="heading">{text}</h1>{" "}
      {children ? <div className="otheractions">{children}</div> : null}
    </div>
  );
};

export const Inlineheading = ({ children }) => {
  return (
    <>
      <h3 style={{ gridColumn: "1/-1", margin: "0 0 -12px 0px" }}>
        {children}
      </h3>
    </>
  );
};

export const Formdiv = ({ theclass, text, children }) => {
  return (
    <>
      <div className={theclass ? theclass + " thegrids" : " thegrids"}>
        <Inlineheading>{text}</Inlineheading>
        {children}
      </div>
    </>
  );
};

export const Chartexplain = ({
  theclass,
  chart,
  setchart,
  setmessage,
  seterror,
}) => {
  const [imgpath, setimgpath] = useState(chart);

  const handleimage = (event) => {
    const file = event.target.files[0];
    if (!file?.type?.startsWith("image/")) {
      console.log("called one");
      setchart([]);
      setmessage("Please select an image file");
      seterror(true);
      setimgpath(chart);
      return;
    } else if (file.type.startsWith("image/")) {
      console.log("called two");
      setchart(file);
      const reader = new FileReader();
      reader.onload = () => {
        setimgpath(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setchart("");
    }
  };

  // console.log(chart);
  // console.log(imgpath);

  const handleremove = (e) => {
    setchart("");
    setimgpath("");
  };

  return (
    <>
      {chart || imgpath?.startsWith("blob") ? (
        <>
          <div className={theclass ? theclass + " formchart" : " formchart"}>
            <img src={imgpath} className="selectedimage" />
            <p className="removeimg" onClick={handleremove}>
              Remove
            </p>
          </div>
        </>
      ) : (
        <div className={theclass ? theclass + " formchart" : " formchart"}>
          <div className="uploadimage">
            <img
              // src="https://www.svgrepo.com/show/491889/upload-image.svg"
              src="/uploadimage.png"
              alt="Upload image"
              style={{ width: "120px" }}
            />
            <label style={{ color: "black" }}>
              Drag your image here, or{" "}
              <span
                style={{
                  color: "#479BFF",
                  fontWeight: "bold",
                  marginTop: "1em",
                }}
              >
                browse
              </span>
            </label>
            <span
              style={{
                color: "rgb(40 48 70)",
                fontSize: "14px",
                marginTop: "1em",
              }}
            >
              Supported only image files
            </span>
          </div>
          <input type="file" accept="image/*" onChange={handleimage} />
        </div>
      )}
    </>
  );
};

export const Waiting = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={10}
          strokeWidthSecondary={4}
        />
        <h2>Loading...</h2>
      </div>
    </>
  );
};

export const Servererror = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Radio
          visible={true}
          height="80"
          width="80"
          ariaLabel="radio-loading"
          wrapperStyle={{}}
          wrapperClass="radio-wrapper"
        />
        <h2>Server Error</h2>
        <p style={{ marginTop: "2em" }}>
          Go to{" ->      "}
          <Link
            to="/"
            style={{ textDecoration: "underline", fontWeight: "bolder" }}
          >
            Dashboard
          </Link>
        </p>
      </div>
    </>
  );
};

export const Outcome = ({ text }) => {
  let className = "";

  if (text === "Win") {
    className = "win";
  } else if (text === "Loss") {
    className = "loss";
  } else if (text === "Break Even") {
    className = "breakeven";
  }

  return (
    <>
      <p className={className}>{text}</p>
    </>
  );
};

export const Greenred = ({ number, append, numberformat }) => {
  let className = "";

  if (number > 0) {
    className = "gain";
  } else if (number < 0) {
    className = "lost";
  } else if (number === 0) {
    className = "breakequal";
  }
  return (
    <>
      {/* <p className={className}>{`${number}${append}`}</p> */}
      <p className={className}>
        {numberformat ? formatNumber(number, 2) : `${number}${append}`}
      </p>
    </>
  );
};

export const Action = ({ action }) => {
  return (
    <>
      <img
        src={action === "Buy" ? "/actionup.png" : "/actiondown.png"}
        alt={`action ${action}`}
        style={{ width: "30px" }}
      />
    </>
  );
};

export const Editdeleteset = ({ id, deletefunc }) => {
  return (
    <>
      <div className="flex" style={{ justifyContent: "flex-start" }}>
        <Link
          to={`/edit/${id}`}
          style={{
            display: "flex",
            gap: "0.5em",
            fontSize: "1.2em",
            color: "#2bff00",
          }}
        >
          <img src="/edit.svg" style={{ width: "25px" }} /> Edit
        </Link>
        <div
          className="flex"
          style={{ gap: ".5em" }}
          onClick={(e) => deletefunc(id)}
        >
          <img src="/delete.svg" style={{ width: "25px" }} />{" "}
          <p style={{ color: "red", fontSize: "1.2em" }}>Delete</p>
        </div>
      </div>
    </>
  );
};

export const Imagezoom = ({ theimage }) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <>
      <div style={{ position: "relative" }}>
        <img
          src={theimage}
          style={{
            gridColumn: "1/-1",
            width: "100%",
            marginBottom: "2em",
            maxHeight: "max-content",
          }}
        />
        <p
          className="removeimg"
          style={{
            color: "black",
            bottom: "3em",
            // left: "50%",
            // transform: "translate(-50%, 50%)",
          }}
          onClick={(e) => setIsOpened(true)}
        >
          Full
        </p>
      </div>
      {isOpened ? (
        <div className="backdropfilter">
          <div className="imageenlarge">
            <img src={theimage} />
            <div className="removeimg" onClick={(e) => setIsOpened(false)}>
              Close
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export const Notradefound = () => {
  return (
    <Thenote className="notfound">
      <h2>Hey! no trade found first add one</h2>
      <Link to="/new-trade" className="primarybtn">
        Add New Trade
      </Link>
    </Thenote>
  );
};

export const Accountsettings = ({ saveFunc, btnclass }) => {
  const [data, setdata] = useState([]);
  const [showcontent, setshowcontent] = useState(false);

  function getData() {
    getAccountUserDetails()
      .then((response) => {
        console.log(response);
        setdata(response);
        setshowcontent(true);
      })
      .catch((error) => {
        // errorhandler(error, setmessage).then(() => {
        //   setnotifyerror(true);
        // });
        alert("Some Error occured");
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const handlesubmit = (event) => {
    event.preventDefault();

    const formDataObj = {
      firstname: data?.firstname,
      lastname: data?.lastname,
      mobileno: data?.mobileno,
      state: data?.state,
      broker: data?.broker,
    };

    saveFunc(data);
  };

  if (showcontent === false) {
    return <Waiting />;
  }
  if (showcontent === "servererror") {
    return (
      <>
        <Servererror />
      </>
    );
  }

  if (showcontent)
    return (
      <>
        <div className="thebox defaultpad defaultbr">
          <form
            onSubmit={handlesubmit}
            id="theform"
            method="post"
            encType="multipart/form-data"
            className="accountgrid"
          >
            <Theinput
              type="text"
              label="First Name"
              placeholder=""
              state={data?.firstname}
              setstate={(value) => setdata({ ...data, firstname: value })}
            />
            <Theinput
              type="text"
              label="Last Name"
              placeholder=""
              state={data?.lastname}
              setstate={(value) => setdata({ ...data, lastname: value })}
            />{" "}
            <Theinput
              type="number"
              label="Mobile"
              placeholder="8741xxx986"
              state={data?.mobileno}
              className="holeone"
              setstate={(value) => setdata({ ...data, mobileno: value })}
            />
            <Theselect
              label="State"
              options={indianStates}
              state={data?.state}
              className="holeone"
              setState={(value) => setdata({ ...data, state: value })}
            />
            <Theselect
              label="Broker"
              options={["", "Upstox", "Zerodha", "Angel one"]}
              state={data?.broker}
              className="holeone"
              setState={(value) => setdata({ ...data, broker: value })}
            />
            <button
              type="submit"
              className={btnclass ? `${btnclass} primarybtn ` : "primarybtn"}
            >
              Update Information
            </button>
          </form>
        </div>
      </>
    );
};

export const Fullwindowbackground = ({ children, className }) => {
  return (
    <div className="fullwidth">
      <div
        className={
          className ? className + " popupCenter thebox" : " popupCenter thebox"
        }
      >
        {children}
      </div>
    </div>
  );
};

export const Thenote = ({ children, className }) => {
  return (
    <div
      className={className ? className + " thenote thebox" : " thenote thebox"}
    >
      {children}
    </div>
  );
};

export const Notesviewer = ({
  data,
  className,
  deleteFunction,
  tradeid,
  setnote,
  clearnotification,
}) => {
  return (
    <>
      {data?.length > 0 ? (
        <div
          className={
            className ? className + " notelist thebox" : " notelist thebox"
          }
          style={{ margin: "1em 0" }}
        >
          {data?.map((item, index) => {
            const uniqueId = uuidv4();
            return (
              <React.Fragment key={uniqueId}>
                {
                  <div
                    className=" thebox"
                    style={{
                      padding: "1em 0",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>{item}</p>{" "}
                    <div className="flexend">
                      <img
                        src="/edit.svg"
                        style={{ width: "20px" }}
                        onClick={(e) => {
                          clearnotification();
                          setnote({ index: index, note: item });
                        }}
                      />
                      <img
                        src="/delete.svg"
                        style={{ width: "20px" }}
                        onClick={(e) => deleteFunction(tradeid, index)}
                      />
                    </div>
                  </div>
                }
              </React.Fragment>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export const Reportselector = ({ data, hoveredIndex, setHoveredIndex }) => {
  const [reportselector, setreportselector] = useState(false);
  // console.log(data);

  const handleClicoutside = (e) => {
    const theitem = document.querySelector(".thereportselector");

    if (!theitem.contains(e.target)) {
      // The user has clicked outside the custom selector box
      setreportselector(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClicoutside);

    return () => {
      document.removeEventListener("click", handleClicoutside);
    };
  }, []);

  return (
    <div className="thereportselector">
      <p
        className="selectedone"
        onClick={(e) => setreportselector(!reportselector)}
      >
        {data?.[hoveredIndex]?._id}{" "}
        <img
          src="/droparrow.svg"
          style={{ width: "10px" }}
          className="customreportdrop"
        />
      </p>
      <div
        className={
          reportselector
            ? data?.length > 20
              ? "alotdata thecustomselectorbox openbox"
              : " thecustomselectorbox openbox dothatstyle"
            : "thecustomselectorbox closebox"
        }
        // style={{ display: reportselector ? "block" : "none" }}
      >
        {data?.map((item, index) => {
          const uniqueId = uuidv4();
          return (
            <React.Fragment key={uniqueId}>
              <p
                className={
                  hoveredIndex === index
                    ? "selected thecustomoption"
                    : "thecustomoption"
                }
                onClick={(e) => {
                  setHoveredIndex(index);
                  setreportselector(false);
                }}
              >
                {item._id}
              </p>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export const Reportselectorformonthly = ({
  data,
  hoveredIndex,
  setHoveredIndex,
  dataof,
}) => {
  const [reportselector, setreportselector] = useState(false);
  console.log(data);

  const handleClicoutside = (e) => {
    const theitem = document.querySelector(".thereportselector");

    if (!theitem.contains(e.target)) {
      // The user has clicked outside the custom selector box
      setreportselector(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClicoutside);

    return () => {
      document.removeEventListener("click", handleClicoutside);
    };
  }, []);

  var fordataji = dataof(data);

  return (
    <div className="thereportselector">
      <p
        className="selectedone"
        onClick={(e) => setreportselector(!reportselector)}
      >
        {fordataji?.[hoveredIndex]}{" "}
        <img
          src="/droparrow.svg"
          style={{ width: "10px" }}
          className="customreportdrop"
        />
      </p>
      <div
        className={
          reportselector
            ? data?.length > 20
              ? "alotdata thecustomselectorbox openbox"
              : " thecustomselectorbox openbox dothatstyle"
            : "thecustomselectorbox closebox"
        }
        // style={{ display: reportselector ? "block" : "none" }}
      >
        {fordataji?.map((item, index) => {
          const uniqueId = uuidv4();
          return (
            <React.Fragment key={uniqueId}>
              <p
                className={
                  hoveredIndex === index
                    ? "selected thecustomoption"
                    : "thecustomoption"
                }
                onClick={(e) => {
                  setHoveredIndex(index);
                  setreportselector(false);
                }}
              >
                {item}
              </p>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export const Pnltable = ({
  data,
  headtext = "Most Profitable",
  type,
  whichone,
}) => {
  // console.log(data);
  return (
    <>
      <div
        className="pnltablereport"
        style={{ margin: whichone === "worstTrades" ? "3em 0 5em 0" : null }}
      >
        <h3 style={{ margin: ".8em 0" }}>{headtext}</h3>
        <div className="tradewrapper">
          <div className="anothertrade heading">
            <p>Symbol</p>
            <p>{type === "win" ? "Profit" : "Loss"}</p>
            <p>Unit</p>
            <p>Return, %</p>
            <p>Action</p>
            <p>Open Date</p>
            <p>{type === "win" ? "Net Profit" : "Net Loss"}</p>

            <p>R Multiple</p>
            <p>R Planned</p>
          </div>
          {data && data.length > 0 ? (
            data?.[0]?.[whichone].map((item) => {
              return (
                <div key={item._id} className="anothertrade">
                  <Link to={`/detail/${item?._id}`} className="reportdetail">
                    {item?.symbol}
                  </Link>
                  <p>{item?.profit}</p>
                  <p>{item?.quantity}</p>
                  <p> {item?.returnpercent}%</p>
                  <p> {item?.action}</p>
                  <p> {momentsmall(item?.entrydate)}</p>
                  <p> {item?.netpnl}</p>
                  <p> {item?.rmultiple}</p>
                  <p> {item?.rrrplanned}</p>
                </div>
              );
            })
          ) : (
            <div className="notradefoundtable">
              <p>No Trades found</p>
            </div>
          )}{" "}
        </div>
      </div>
    </>
  );
};

export const Showotherdetails = ({ data, forheading, themonth }) => {
  // console.log(data);

  var datalength = data?.trades?.length;
  var forprofit = data?.bestTrade?.profit > 0;
  var fortheloss = data?.worstTrade?.profit < 0;

  var printprofit =
    data?.bestTrade?.symbol +
    // " (" +
    // data?.bestTrade?.profit +
    // ")" +
    " (" +
    data?.bestTrade?.returnpercent +
    "%)";
  var printloss =
    data?.worstTrade?.symbol +
    // " (" +
    // data?.worstTrade?.profit +
    // ")" +
    " (" +
    data?.worstTrade?.returnpercent +
    "%)";
  // console.log(checkedbestworst)

  return (
    <>
      {/* <h3 style={{ margin: "2em 0 1em 0" }}> */}
      <h3 style={{ marginBottom: "1em" }}>
        {forheading} {" - "} {themonth ? themonth : data?._id}
      </h3>
      <div className="showrportdetail">
        <p>
          Best Trade{" "}
          <span>
            {datalength === 1 && forprofit
              ? printprofit
              : datalength > 1 && forprofit
              ? printprofit
              : "-"}
          </span>
        </p>
        <p>
          Worst Trade{" "}
          <span>
            {" "}
            {datalength === 1 && fortheloss
              ? printloss
              : datalength > 1 && fortheloss
              ? printloss
              : "-"}
          </span>
        </p>
        <p>
          Max Return, % <span>{data?.maxReturnPercent.toFixed(2)}%</span>
        </p>
        <p>
          Min Return, % <span>{data?.minReturnPercent.toFixed(2)}%</span>
        </p>
        <p>
          Win Rate <span>{(data?.winRate * 100).toFixed(1)}%</span>
        </p>
        <p>
          Loss Rate <span>{(data?.lossRate * 100).toFixed(1)}%</span>
        </p>
        <p>
          Total PNL <span>{data?.totalPnL.toFixed(2)}</span>
        </p>
        <p>
          Total Fees <span>{data?.totalFees.toFixed(2)}</span>
        </p>
        <p>
          Trade Count <span>{data?.countTrades}</span>
        </p>
        {data?.mostTradedSymbol && (
          <p>
            Most Traded <span>{data?.mostTradedSymbol}</span>
          </p>
        )}
      </div>{" "}
    </>
  );
};

export const Calendardata = ({ text, children, theclassName }) => {
  return (
    <>
      <div className={theclassName}>
        <p className="forcalendarp">{text}</p>
        {children}
      </div>
    </>
  );
};

export const Pleaseaddsomedata = () => {
  return (
    <>
      <Layout>
        <Notradefound />
      </Layout>
    </>
  );
};

export const Thegrid = ({
  theclassname,
  gap = "1em",
  count,
  size = "1fr",
  children,
}) => {
  return (
    <>
      <div
        className={theclassname}
        style={{
          display: "grid",
          gap: "1em",
          gridTemplateColumns: count ? `repeat(${count} , ${size})` : size,
        }}
      >
        {children}
      </div>
    </>
  );
};

export const Top5data = ({ theclassname, text, data, dataarray, children }) => {
  console.log(dataarray);
  return (
    <>
      <div
        className={
          theclassname ? theclassname + ` thebox somepad` : ` thebox somepad`
        }
      >
        <h2 className="toph2" style={{ fontSize: "1em", marginBottom: "1em" }}>
          {text}
        </h2>
        {data?.map((item, index) => {
          return (
            <div key={item?._id} className=" top5comp">
              <div className="leftsidetop">
                <h5>
                  {dataarray ? dataarray?.[item?._id - 1] : item?._id} (
                  {item?.tradecount})
                </h5>
                {/* <p>Trade Count {item?.tradecount}</p> */}
                <p>Net Pnl {item?.totalnetpnl.toFixed(1)} ₹</p>
                <p>AVG RP {item?.avgreturnpercent.toFixed(1)}%</p>
              </div>
              <p className="winratecss ">
                {item?.winRate.toFixed(1)}%<span>Win Rate</span>
              </p>
              <Doughnutchart
                chartdatas={[
                  item?.winRate.toFixed(1),
                  item?.lossRate.toFixed(1),
                ]}
                chartlabels={["Win", "Loss"]}
                // thecolor={["#11009E", "#D61355"]}
                thecutout="75%"
                theclassName="top5doughnut"
                thefontsize="10"
                disabletext
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
