import React from "react";
import Stock from "./learnclass";

function Brokerage({ setstate, buyprice, sellprice, quantity }) {
  var mystock = new Stock(quantity, buyprice, sellprice);
  console.log(mystock.totaltaxes);
  setstate(mystock.totaltaxes);
  function updatefee(e) {}

  return (
    <div className="feerecommend" onClick={updatefee}>
      {mystock.totaltaxes}
    </div>
  );
}

export default Brokerage;
