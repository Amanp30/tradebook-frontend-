import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Heading, Thegrid, Top5data } from "../components/Littles";
import { daysOfWeek, monthNames } from "../helpers/functions";
import { dashboardReport } from "../services/apiEndpoints";
import Errorui from "../components/Errorui";
import Linechart from "../components/charts/Linechart";
import Linechartwithout from "../components/charts/Linechartwithout";

function Dashboard() {
  const [data, setData] = useState([]);
  const [showContent, setshowContent] = useState(false);

  useEffect(() => {
    dashboardReport()
      .then((response) => {
        console.log(response);
        setData(response);
        setshowContent(true);
      })
      .catch((error) => {
        setshowContent("servererror");
      });
  }, []);

  // other necessary data properties

  return (
    <>
      <Layout>
        <Heading text="Dashboard" />

        {/* {JSON.stringify(data)} */}
        <Errorui showContent={showContent}>
          <div className="thebox thepad">
            <Linechartwithout
              chartdata={data?.chartdata?.[0]?.netpnlarray}
              labelsdata={data?.chartdata?.[0]?.symbols}
            />
          </div>

          <Thegrid count="4" theclassname="top5repogrid">
            <Top5data data={data?.topsymbol} text={"Top Symbols"} />
            <Top5data
              data={data?.topmonth}
              dataarray={monthNames}
              text={"Top Month"}
            />
            <Top5data
              data={data?.topweekday}
              dataarray={daysOfWeek}
              text={"Top Week Day"}
            />
            <Top5data data={data?.topyear} text={"Top Year"} />
          </Thegrid>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Errorui>
      </Layout>
    </>
  );
}

export default Dashboard;
