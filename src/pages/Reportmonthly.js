import React, { useState, useEffect, useLayoutEffect, useReducer } from "react";
import Chart from "../components/charts/chart";
import Layout from "../components/Layout";
import useNotify from "../hooks/useNotify";
import { getReportmonthly } from "../services/apiEndpoints";
import {
  Heading,
  Pnltable,
  Reportselectorformonthly,
  Showotherdetails,
} from "../components/Littles";
import { getMonthNames, monthNames } from "../helpers/functions";

function Reportmonthly() {
  const {
    clearnotification,
    notifysuccess,
    notifyerror,
    message,
    setnotifysuccess,
    setmessage,
    setnotifyerror,
  } = useNotify();

  const [values, setvalues] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [error, seterror] = useState(0);

  useEffect(() => {
    getReportmonthly()
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

  var thelabeledmontharray = getMonthNames(values.labels);

  return (
    <>
      <Layout
        message={message}
        success={notifysuccess}
        setsuccess={setnotifysuccess}
        error={notifyerror}
        seterror={setnotifyerror}
      >
        <Heading text="Monthly">
          <Reportselectorformonthly
            data={values?.labels}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        </Heading>
        <div className="thebox thepad">
          <Chart
            ytitle="PNL In RS"
            xtitle="Timeframe"
            label={thelabeledmontharray}
            profitandloss={values.pnlArray}
            percentarray={values.averageReturnPercent}
            color={values.color}
            tradecount={values.tradecount}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            // showoptions={false}
          />
        </div>

        <div className="thepad">
          <Showotherdetails
            forheading="Month"
            data={values?.data?.[hoveredIndex]}
            themonth={monthNames?.[hoveredIndex]}
          />
          <Pnltable
            data={filteredBestTrades}
            type="win"
            whichone={"bestTrades"}
            headtext="Most Profitable"
          />
          <Pnltable
            data={filteredWorstTrades}
            type="Loss"
            whichone={"worstTrades"}
            headtext="Worst Trades"
          />
        </div>
      </Layout>
    </>
  );
}

export default Reportmonthly;
