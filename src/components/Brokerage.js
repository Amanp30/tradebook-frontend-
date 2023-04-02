import React from "react";
import Stock from "./Forbrokerages";
import { getCookie } from "../helpers/Cookie";

function Brokerage({ setstate, buyprice, sellprice, quantity }) {
  const mystock = new Stock(quantity, buyprice, sellprice);

  const [brokerageCookie, setBrokerageCookie] = React.useState(
    getCookie("autofee")
  );

  var thetrio = quantity && buyprice && sellprice;

  if (!thetrio) {
    setstate(0);
  } else if (brokerageCookie === "true") {
    setstate(mystock.totaltaxes);
  } else if (brokerageCookie === "false") {
    setstate((fee) => fee);
  }

  function updateFee() {
    if (brokerageCookie === "true") {
      document.cookie = `autofee=false; path=/; max-age=${
        10 * 365 * 24 * 60 * 60 * 60
      }`;
      setBrokerageCookie("false");
      setstate((fee) => fee);
    } else if (brokerageCookie === "false") {
      document.cookie = `autofee=true; path=/; max-age=${
        10 * 365 * 24 * 60 * 60 * 60
      }`;
      setBrokerageCookie("true");
      setstate(mystock.totaltaxes);
    }
  }

  return (
    <p className="feerecommend" onClick={updateFee}>
      (
      {brokerageCookie === "true"
        ? "Calculate Manually"
        : "Calculate Automatically"}
      )
    </p>
  );
}

export default Brokerage;
