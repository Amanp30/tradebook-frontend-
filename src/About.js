import React from "react";
import Stock from "./components/learnclass";

function About() {
  const indusindbk = new Stock(10, 120, 98.36);

  return (
    <div>
      <p>Buy amount - {indusindbk.buyamount}</p>
      <p>Sell amount - {indusindbk.sellamount}</p>
      <p>Profit - {indusindbk.profit}</p>
      <p>brokerage charges - {indusindbk.brokerage}</p>
      <p>stt - {indusindbk.stt}</p>
      <p>Stamp duty - {indusindbk.stampduty}</p>
      <p>transaction charges - {indusindbk.transactioncharges}</p>
      <p>Sebi charges - {indusindbk.sebicharges}</p>
      <p>gst charges - {indusindbk.gst}</p>
      <p>Total taxes charges - {indusindbk.totaltaxes}</p>
      <p>breakeven - {indusindbk.breakeven}</p>
      <p>othercharges - {indusindbk.othercharges}</p>
      <p>netpnl - {indusindbk.netpnl}</p>
      <p>Gain percent - {indusindbk.gainpercent}</p>
    </div>
  );
}

export default About;
