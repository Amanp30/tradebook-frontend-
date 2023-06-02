class Stock {
  //   #another;                 // This is a private field  declared with #
  constructor({
    action,
    quantity,
    entry,
    exit,
    brokerage,
    transactioncharges,
    entrytime,
    exittime,
    stoploss,
    takeprofit,
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
    this.entrytime = entrytime;
    this.exittime = exittime;
    this.stoploss = stoploss;
    this.takeprofit = takeprofit;
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
    return Math.floor(sellStt).toFixed(2);
  }

  get stampduty() {
    const buyStampDuty = Math.floor(
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
    const roundedCharges = Math.abs(charges * 100) / 100; // round down to 2 decimal places
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
    return Math.floor(this.totaltaxes / this._quantity).toFixed(2);
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

  get outcome() {
    if (/* this.action === "Sell" && */ this.pnlpershare > 0) {
      return "Win";
    } else if (this.pnlpershare < 0) {
      return "Loss";
    } else if (this.pnlpershare === "0.00") {
      return "Break Even";
    }
  }

  /* that works wornderfully but only in min */
  get holdingPeriodminute() {
    // console.log(this.entrytime);
    // console.log(this.exittime);
    const entryDate = new Date(this.entrytime);
    const exitDate = new Date(this.exittime);
    const millisecondsInMinute = 60 * 1000;
    const holdingPeriodInMinutes =
      (exitDate - entryDate) / millisecondsInMinute;
    return holdingPeriodInMinutes;
  }

  /* in hours  */
  get holdingPeriodhour() {
    const entryDate = new Date(this.entrytime);
    const exitDate = new Date(this.exittime);
    const millisecondsInMinute = 60 * 1000;
    const millisecondsInHour = 60 * millisecondsInMinute;
    const holdingPeriodInMilliseconds = exitDate - entryDate;
    const holdingPeriodInHours = Math.floor(
      holdingPeriodInMilliseconds / millisecondsInHour
    );
    const remainingMilliseconds =
      holdingPeriodInMilliseconds % millisecondsInHour;
    const holdingPeriodInMinutes = Math.floor(
      remainingMilliseconds / millisecondsInMinute
    );
    return holdingPeriodInHours + " : " + holdingPeriodInMinutes;
  }

  get rrrplanned() {
    if (this.action === "Buy") {
      const pnl = this.takeprofit - this.entry;
      const risk = this.entry - this.stoploss;
      return (pnl / risk).toFixed(2);
    } else if (this.action === "Sell") {
      const pnl = this.entry - this.takeprofit;
      const risk = this.stoploss - this.entry;
      return (pnl / risk).toFixed(2);
    }
  }

  get rmultiple() {
    if (this.action === "Buy") {
      const pnl = this.exit - this.entry;
      const risk = this.entry - this.stoploss;
      return (pnl / risk).toFixed(2);
    } else if (this.action === "Sell") {
      const pnl = this.entry - this.exit;
      const risk = this.stoploss - this.entry;
      return (pnl / risk).toFixed(2);
    }
  }

  get rmultipledifference() {
    var diff = Math.abs(this.rrrplanned - this.rmultiple);
    return diff;
  }
}

export default Stock;
