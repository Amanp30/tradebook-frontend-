import React from "react";
import Stock from "./Forbrokerages";
import { brokerdata } from "../helpers/brokerdata";
function Brokerage({ setstate, buyprice, sellprice, quantity, broker }) {
  const brokerInfo = brokerdata[broker.toLowerCase()]; // Get the brokerage and stt based on the broker name

  const mystock = new Stock({
    quantity: quantity,
    buy: buyprice,
    sell: sellprice,
    brokerage: brokerInfo.brokerage,
    transactioncharges: brokerInfo.transactioncharges,
  });

  // var thetrio = quantity && buyprice && sellprice;

  return (
    <span
      className={`feerecommend ${broker}`}
      onClick={(e) => setstate(mystock.totaltaxes)}
    >
      Suggested <span>₹ {mystock.totaltaxes}</span>
    </span>
  );
}

export default Brokerage;
