import React from "react";

function Brokerage({ setstate, broker, taxes }) {
  return (
    <span
      className={`feerecommend ${broker.toLowerCase().replace(/\s/g, "")} ${
        taxes === "NaN" || taxes === "0.00" ? "hidesuggest" : ""
      }`}
      onClick={(e) => setstate(taxes)}
    >
      Suggested <span>₹ {taxes}</span>
    </span>
  );
}

export default Brokerage;
