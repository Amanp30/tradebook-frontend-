import React, { useState, useEffect, useLayoutEffect, useReducer } from "react";
import Chart from "../components/charts/chart";
import Layout from "../components/Layout";
import useNotify from "../hooks/useNotify";
import { getReport } from "../services/apiEndpoints";
import {
  Heading,
  Pnltable,
  Reportselector,
  Showotherdetails,
} from "../components/Littles";

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

function Reporttimeframe() {
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
    getReport()
      .then((res) => {
        setvalues(res);
        console.log("from server");
        console.table(res);
      })
      .catch((error) => seterror(error));
  }, []);

  const timeframe = values.data?.[hoveredIndex]?.sortOrderIndex;
  const filteredBestTrades = values?.bestTrades?.filter((theindex, index) => {
    if (theindex.sortOrderIndex === timeframe) {
      return theindex;
    }
  });
  const filteredWorstTrades = values?.worstTrades?.filter((theindex, index) => {
    if (theindex.sortOrderIndex === timeframe) {
      return theindex;
    }
  });
  // console.log(filteredWorstTrades);

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
          />
        </div>{" "}
        <div className="thepad">
          <Showotherdetails
            forheading="Timeframe"
            data={values?.data?.[hoveredIndex]}
          />
          <Pnltable
            data={filteredBestTrades}
            type="win"
            whichone={"bestTrades"}
            headtext="Most Profitable"
          />
          <Pnltable
            data={filteredWorstTrades}
            type="loss"
            whichone={"worstTrades"}
            headtext="Worst Trades"
          />
        </div>
      </Layout>
    </>
  );
}

export default Reporttimeframe;
