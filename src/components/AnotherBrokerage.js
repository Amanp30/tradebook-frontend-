import React from "react";

function Brokerage({ setstate, broker, taxes }) {
  return (
    <span className={`feerecommend ${broker}`} onClick={(e) => setstate(taxes)}>
      Suggested <span>₹ {taxes}</span>
    </span>
  );
}

export default Brokerage;
