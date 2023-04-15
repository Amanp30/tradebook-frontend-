import React from "react";
import { momentdate, onlytime } from "../helpers/functions";
import { Link } from "react-router-dom";
import { Action, Greenred, Outcome } from "./Littles";
import "./Tradecontent.css";
import { useParams } from "react-router-dom";

const Tradecontent = ({ data, deletefunc }) => {
  const { trade } = useParams();
  console.log(trade);
  console.log(data);

  return (
    <>
      <div className="thebox alltradescontainer">
        <div className="thetrade tradeitems">
          <p>Action</p> <p>Outcome</p> <p>Symbol</p> <p>Entry Date</p>{" "}
          <p>Unit</p>
          <p>Open Price</p> <p>Exit Time</p> <p>Exit Price</p> <p>Timeframe</p>{" "}
          <p>Return, %</p>
          <p>Return, ₹</p>
          <p></p>
        </div>
        {data.map((item) => {
          return (
            <React.Fragment key={item._id}>
              <div className="thetrade hoverbg">
                <Action action={item.action} />
                <Outcome text={item.outcome} />
                <Link
                  to={`/detail/${item._id}`}
                  style={{
                    fontWeight: "bolder",
                    borderBottom: "1px dashed",
                    width: "fit-content",
                  }}
                >
                  {item.symbol}
                </Link>
                <p>{momentdate(item.entrydate)}</p>
                <p>{item.quantity}</p>
                <p>{item.entryprice}</p>
                <p>{onlytime(item.exitdate)}</p>
                <p>{item.exitprice}</p>
                <p>{item.timeframe}</p>
                <Greenred number={item.returnpercent} append={"%"} />
                <Greenred number={item.profit} append={" INR"} />

                <div className="flex">
                  <Link to={`/edit/${item._id}`}>
                    <img src="/edit.svg" style={{ width: "25px" }} />
                  </Link>
                  <img
                    src="/delete.svg"
                    onClick={(e) => deletefunc(item._id)}
                    style={{ width: "25px" }}
                  />
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Tradecontent;
