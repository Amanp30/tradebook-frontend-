import React, { useState, useEffect, useLayoutEffect, useReducer } from "react";
import Chart from "../../components/charts/chart";
import Layout from "../../components/Layout";
import { getReportmonthly } from "../../services/apiEndpoints";
import {
  Heading,
  Pleaseaddsomedata,
  Pnltable,
  Reportselectorformonthly,
  Showotherdetails,
} from "../../components/Littles";
import { getMonthNames, getWeekDay, monthNames } from "../../helpers/functions";
import Errorui from "../../components/Errorui";

function Reportmonthly() {
  const [values, setvalues] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [showContent, setshowContent] = useState(false);

  useEffect(() => {
    getReportmonthly()
      .then((res) => {
        setvalues(res);
        console.log("from server");
        console.table(res);
        setshowContent(true);
      })
      .catch((error) => {
        setshowContent("servererror");
      });
  }, []);

  const timeframe = values?.data?.[hoveredIndex]?.sortOrderIndex;
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

  var thelabeledmontharray = getMonthNames(values?.labels);

  if (showContent && !values?.data?.length > 0) {
    return (
      <>
        <Pleaseaddsomedata />
      </>
    );
  }

  return (
    <>
      <Layout>
        <Errorui showContent={showContent}>
          <Heading text="Monthly">
            <Reportselectorformonthly
              data={values?.labels}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              dataof={getMonthNames}
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
              themonth={thelabeledmontharray?.[hoveredIndex]}
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
        </Errorui>
      </Layout>
    </>
  );
}

export default Reportmonthly;
