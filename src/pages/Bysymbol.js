import React, { useState, useEffect, useLayoutEffect, useReducer } from "react";
import Chart from "../components/charts/chart";
import Layout from "../components/Layout";
import useNotify from "../hooks/useNotify";
import { getReportSymbol } from "../services/apiEndpoints";
import { Heading, Reportselector } from "../components/Littles";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Bysymbol() {
  const {
    clearnotification,
    notifysuccess,
    notifyerror,
    message,
    setnotifysuccess,
    setmessage,
    setnotifyerror,
  } = useNotify();

  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const [values, setvalues] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [error, seterror] = useState(0);

  useLayoutEffect(() => {
    const width = document.body.clientWidth;
    console.log(`Width: ${width}`);
  }, [state]);

  useEffect(() => {
    getReportSymbol()
      .then((res) => {
        setvalues(res);
        console.log("from server");
        console.table(res);
      })
      .catch((error) => seterror(error));
  }, []);

  const timeframe = values.data?.[hoveredIndex]?.sortOrderIndex;
  const filteredBestTrades = values?.bestTrades?.filter((theindex) => {
    if (theindex.sortOrderIndex === timeframe) {
      return theindex;
    }
  });
  const filteredWorstTrades = values?.worstTrades?.filter((theindex) => {
    if (theindex.sortOrderIndex === timeframe) {
      return theindex;
    }
  });

  return (
    <>
      <Layout
        message={message}
        success={notifysuccess}
        setsuccess={setnotifysuccess}
        error={notifyerror}
        seterror={setnotifyerror}
      >
        <Heading text="Timeframe">
          <Reportselector
            data={values?.data}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        </Heading>
        <div className="thebox thepad">
          {" "}
          <Chart
            ytitle="PNL In RS"
            xtitle="Timeframe"
            label={values.labels}
            profitandloss={values.pnlArray}
            percentarray={values.averageReturnPercent}
            color={values.color}
            tradecount={values.tradecount}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            // showoptions={false}
          />
          <div>
            <p className="flex">
              Timeframe <span> {values.data?.[hoveredIndex]?._id}</span>
            </p>
            <p className="flex">
              No of trades taken in timeframe{" "}
              <span> {values.data?.[hoveredIndex]?.countTrades}</span>
            </p>
            <p className="flex">
              maxReturnPercent
              <span> {values.data?.[hoveredIndex]?.maxReturnPercent}%</span>
            </p>
            <p className="flex">
              minReturnPercent
              <span> {values.data?.[hoveredIndex]?.minReturnPercent}%</span>
            </p>
            <p className="flex">
              Win Rate
              <span> {values.data?.[hoveredIndex]?.winRate}</span>
            </p>
            <p className="flex">
              Loss Rate
              <span> {values.data?.[hoveredIndex]?.lossRate}</span>
            </p>
            <p className="flex">
              Total Pnl
              <span> {values.data?.[hoveredIndex]?.totalPnL}</span>
            </p>
            <p className="flex">
              Fees Paid
              <span> {values.data?.[hoveredIndex]?.totalFees}</span>
            </p>
            <p className="flex">
              Most traded symbol
              <span> {values.data?.[hoveredIndex]?.mostTradedSymbol}</span>
            </p>

            <h2> Most profitable trades</h2>
            {filteredBestTrades && filteredBestTrades.length > 0 ? (
              filteredBestTrades?.[0]?.bestTrades.map((item) => {
                return (
                  <div key={item._id}>
                    <p>Name {item?.symbol}</p>
                    <p>Profit{item?.profit}</p>
                    <p>Return Percent {item?.returnpercent}%</p>
                  </div>
                );
              })
            ) : (
              <p>"Nothing found"</p>
            )}
            <h2> Most worst trades</h2>
            {filteredWorstTrades && filteredWorstTrades.length > 0 ? (
              filteredWorstTrades?.[0]?.worstTrades.map((item) => {
                return (
                  <div key={item._id}>
                    <p>Name {item?.symbol}</p>
                    <p>Loss{item?.profit}</p>
                    <p>Return Percent {item?.returnpercent}%</p>
                  </div>
                );
              })
            ) : (
              <p>"Nothing found"</p>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Bysymbol;
