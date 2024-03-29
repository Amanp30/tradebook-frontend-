import React, { useState, useEffect, useLayoutEffect, useReducer } from "react";
import Chart from "../../components/charts/chart";
import Layout from "../../components/Layout";
import { getReportholdingtime } from "../../services/apiEndpoints";
import {
  Heading,
  Pnltable,
  Reportselector,
  Showotherdetails,
  Pleaseaddsomedata,
} from "../../components/Littles";
import Errorui from "../../components/Errorui";

function Reportholdingtime() {
  const [values, setvalues] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [showContent, setshowContent] = useState(false);

  useEffect(() => {
    getReportholdingtime()
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
          <Heading text="Holding Time Report">
            <Reportselector
              data={values?.data}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          </Heading>
          <div className="thebox thepad">
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
              forheading="Holding Time"
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
        </Errorui>
      </Layout>
    </>
  );
}

export default Reportholdingtime;
