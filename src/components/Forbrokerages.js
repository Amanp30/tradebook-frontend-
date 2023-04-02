class Stock {
  //   #another;                 // This is a private field  declared with #
  constructor({
    action,
    quantity,
    entry,
    exit,
    brokerage,
    transactioncharges,
  }) {
    if (!new.target) {
      throw new Error("Please initialize first with new keyword");
    }
    this.action = action;
    this._quantity = quantity;
    this.entry = entry;
    this.exit = exit;
    this.thebrokerage = brokerage;
    this.thetransactioncharges = transactioncharges;
    // this.#another = 5; // setting private field value
  }

  /* function to return private field value */
  //   get anotherone() {
  //     return this.#another;
  //   }

  get quantity() {
    return this._quantity;
  }

  get buyamount() {
    return this.entry * this._quantity;
  }

  get sellamount() {
    return this.exit * this._quantity;
  }

  get stt() {
    /* const buyStt = (Number(this.buyamount) * 0.0025) / 100; */
    const sellStt = (Number(this.sellamount) * 0.025) / 100;
    return Math.min(sellStt).toFixed(2);
  }

  get stampduty() {
    const buyStampDuty = Math.min(
      (Number(this.buyamount) * 0.003) / 100,
      Number(this.buyamount) * (300 / 10000000)
    );
    return buyStampDuty.toFixed(2);
  }

  get transactioncharges() {
    const charges =
      ((Number(this.buyamount) + Number(this.sellamount)) *
        this.thetransactioncharges) /
      100;
    const roundedCharges = Math.floor(charges * 100) / 100; // round down to 2 decimal places
    return roundedCharges.toFixed(2);
  }

  get sebicharges() {
    const sebiCharges =
      (10 / 10000000) * (Number(this.buyamount) + Number(this.sellamount));
    return sebiCharges.toFixed(2);
  }

  get brokerage() {
    var ap = (this.thebrokerage / 100) * Number(this.buyamount);
    var ep = (this.thebrokerage / 100) * Number(this.sellamount);
    var brokerage = 0;
    if (ap > 20 && ep > 20) {
      brokerage = 40;
    } else if (ap > 20 && ep < 20) {
      brokerage = 20 + ep;
    } else if (ep > 20 && ap < 20) {
      brokerage = 20 + ap;
    } else if (ap < 20 && ep < 20) {
      brokerage = ap + ep;
    }
    return brokerage.toFixed(2);
  }

  get gst() {
    const brokerage = Number(this.brokerage);

    const denominator = brokerage + Number(this.transactioncharges);

    if (denominator === 0) {
      return 0;
    }

    const gst = denominator * 0.18;
    return gst.toFixed(2);
  }

  get totaltaxes() {
    const stt = Number(this.stt);
    const stampduty = Number(this.stampduty);
    const transactioncharges = Number(this.transactioncharges);
    const sebicharges = Number(this.sebicharges);
    const brokerage = Number(this.brokerage);
    const gst = Number(this.gst);

    const total =
      stt + stampduty + transactioncharges + sebicharges + brokerage + gst;
    return total.toFixed(2);
  }

  get breakeven() {
    return Math.min(this.totaltaxes / this._quantity).toFixed(2);
  }

  get othercharges() {
    const stt = Number(this.stt);
    const stampduty = Number(this.stampduty);
    const transactioncharges = Number(this.transactioncharges);
    const sebicharges = Number(this.sebicharges);

    const gst = Number(this.gst);

    const total = stt + stampduty + transactioncharges + sebicharges + gst;
    return total.toFixed(2);
  }

  get profit() {
    var profit;
    if (this.action === "Buy") {
      profit = this.sellamount - this.buyamount;
    } else if (this.action === "Sell") {
      profit = this.buyamount - this.sellamount;
    }
    return profit.toFixed(2);
  }

  get netpnl() {
    const pnl = this.profit - this.totaltaxes;
    return pnl.toFixed(2);
  }

  get gainpercent() {
    const gainPercent = (this.profit / this.buyamount) * 100;
    return gainPercent.toFixed(2);
  }

  get pnlpershare() {
    var pnlPerShare;
    if (this.action === "Buy") {
      pnlPerShare = this.exit - this.entry;
    } else if (this.action === "Sell") {
      pnlPerShare = this.entry - this.exit;
    }
    return pnlPerShare.toFixed(2);
  }
}

export default Stock;
