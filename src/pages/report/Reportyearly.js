import React, { useState, useEffect, useLayoutEffect, useReducer } from "react";
import Chart from "../../components/charts/chart";
import Layout from "../../components/Layout";
import { getReportyearly } from "../../services/apiEndpoints";
import {
  Heading,
  Pleaseaddsomedata,
  Pnltable,
  Reportselector,
  Servererror,
  Showotherdetails,
  Waiting,
} from "../../components/Littles";

function Reportyearly() {
  const [values, setvalues] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [showContent, setshowContent] = useState(false);

  useEffect(() => {
    getReportyearly()
      .then((res) => {
        setvalues(res);
        console.log("from server");
        setshowContent(true);
        console.table(res);
      })
      .catch((error) => setshowContent("servererror"));
  }, []);

  const timeframe = values.data?.[hoveredIndex]?.sortOrderIndex;
  const filteredBestTrades = values?.bestTrades?.filter((theindex) => {
    if (theindex.sortOrderIndex === timeframe) {
      return theindex;
    }
  });
  const filteredWorstTrades = values?.worstTrades?.filter((theindex) => {
    if (theindex?.sortOrderIndex === timeframe) {
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
          <Heading text="Yearly">
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
              // showoptions={false}
            />
          </div>

          <div className="thepad">
            <Showotherdetails
              forheading="Year"
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
              type="Loss"
              whichone={"worstTrades"}
              headtext="Worst Trades"
            />
          </div>
        </Layout>
      </>
    );
}

export default Reportyearly;
