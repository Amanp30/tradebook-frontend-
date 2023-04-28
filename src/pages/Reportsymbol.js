import React, { useState, useEffect, useLayoutEffect, useReducer } from "react";
import Chart from "../components/charts/chart";
import Layout from "../components/Layout";
import useNotify from "../hooks/useNotify";
import { getReportSymbol } from "../services/apiEndpoints";
import {
  Heading,
  Pnltable,
  Reportselector,
  Showotherdetails,
  Waiting,
  Servererror,
} from "../components/Littles";

function Reportsymbol() {
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
  const [showContent, setshowContent] = useState(false);

  useEffect(() => {
    getReportSymbol()
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
        <Layout
          message={message}
          success={notifysuccess}
          setsuccess={setnotifysuccess}
          error={notifyerror}
          seterror={setnotifyerror}
        >
          <Heading text="Symbol">
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
              forheading="Symbol"
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

export default Reportsymbol;
