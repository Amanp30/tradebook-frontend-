import React, { useState, useEffect, lazy, Suspense } from "react";
import Chart from "../../components/charts/chart";
import Layout from "../../components/Layout";
import { getReportweekday } from "../../services/apiEndpoints";
import {
  Heading,
  Pleaseaddsomedata,
  Pnltable,
  Reportselectorformonthly,
  Servererror,
  Showotherdetails,
  Waiting,
} from "../../components/Littles";
import { getWeekDay } from "../../helpers/functions";

function Reportweekday() {
  const [values, setvalues] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [showContent, setshowContent] = useState(false);

  useEffect(() => {
    getReportweekday()
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

  var thedayslabelarray = getWeekDay(values?.labels);

  if (showContent && !values?.data?.length > 0) {
    return (
      <>
        <Pleaseaddsomedata />
      </>
    );
  }

  if (showContent === false) {
    return (
      <Layout>
        <Waiting />
      </Layout>
    );
  }

  if (showContent === "servererror") {
    return (
      <>
        <Layout>
          <Servererror />
        </Layout>
      </>
    );
  }

  if (showContent)
    return (
      <>
        <Layout>
          <Heading text="Weekday Report">
            <Reportselectorformonthly
              data={values?.labels}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              dataof={getWeekDay}
            />
          </Heading>
          <div className="thebox thepad">
            <Chart
              ytitle="PNL In RS"
              xtitle="Timeframe"
              label={thedayslabelarray}
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
              forheading="Day"
              data={values?.data?.[hoveredIndex]}
              themonth={thedayslabelarray?.[hoveredIndex]}
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

export default Reportweekday;
