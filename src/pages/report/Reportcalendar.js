import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getCalenderReport } from "../../services/apiEndpoints";
import moment from "moment";
import {
  formatNumber,
  getDatesForCurrentYear,
  monthNames,
} from "../../helpers/functions";
import Tradecontent from "../../components/Tradecontent";
import {
  Calendardata,
  Heading,
  Pleaseaddsomedata,
  Thenote,
} from "../../components/Littles";
import { v4 as uuid } from "uuid";
import { Doughnutchart } from "../../components/charts/Dougnutchart";
import Errorui from "../../components/Errorui";

function Reportcalendar() {
  const [data, setData] = useState([]);
  const [otherdata, setotherdata] = useState([]);
  const [thefseleceted, setthefseleceted] = useState([]);
  const [showContent, setshowContent] = useState(false);

  useEffect(() => {
    getCalenderReport()
      .then((response) => {
        console.log(response);
        setData(response.result[0].trades);
        setotherdata(response.result[0].summary[0]);
        setshowContent(true);
      })
      .catch((error) => setshowContent("servererror"));
  }, []);

  console.log(data);
  console.log(otherdata);

  var yeararray = getDatesForCurrentYear();

  var mdate = [[], [], [], [], [], [], [], [], [], [], [], []];

  //generating dates and checking days and adding "" array
  for (const date of yeararray) {
    const momentDate = moment(date);
    const engday = momentDate.format("dddd");
    const currentmonth = momentDate.month();

    if (engday === "Saturday" && momentDate.date() === 1) {
      mdate?.[currentmonth]?.push("", "", "", "", "", "", date);
    } else if (engday === "Friday" && momentDate.date() === 1) {
      mdate?.[currentmonth]?.push("", "", "", "", "", date);
    } else if (engday === "Thursday" && momentDate.date() === 1) {
      mdate?.[currentmonth]?.push("", "", "", "", date);
    } else if (engday === "Wednesday" && momentDate.date() === 1) {
      mdate?.[currentmonth]?.push("", "", "", date);
    } else if (engday === "Tuesday" && momentDate.date() === 1) {
      mdate?.[currentmonth]?.push("", "", date);
    } else if (engday === "Monday" && momentDate.date() === 1) {
      mdate?.[currentmonth]?.push("", date);
    } else if (engday === "Sunday" && momentDate.date() === 1) {
      mdate?.[currentmonth]?.push(date);
    } else {
      mdate?.[currentmonth]?.push(date);
    }
  }

  //   console.log(mdate);

  const [selectedDate, setSelectedDate] = useState("");

  const b = mdate?.map((monthDates, index) => (
    <div key={index} className="twelveone">
      <h2 style={{ fontSize: ".8em", marginBottom: ".5em", fontWeight: "500" }}>
        {monthNames[index]}
      </h2>
      <div>
        {monthDates?.map((date) => {
          const foundData = data?.find((d) => d?._id?.includes(date));

          return (
            <React.Fragment key={uuid()}>
              <div
                key={date}
                className={`calendar-date ${
                  date === ""
                    ? ""
                    : foundData?.profitinrs > 0
                    ? "profitgreen"
                    : foundData?.profitinrs < 0
                    ? "profitred"
                    : "defaultnotcolored"
                } ${selectedDate && selectedDate === date ? "selected" : ""}`}
                onClick={() => {
                  if (date !== "" && foundData) {
                    setSelectedDate(date);
                    setthefseleceted(foundData);
                  } else {
                    // console.log("No data found");
                  }
                }}
              ></div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  ));

  const shortDays = ["S", "M", "T", "W", "T", "F", "S"];

  const days = shortDays?.map((day) => <p key={uuid()}>{day}</p>);

  if (showContent && !data?.length > 0) {
    return (
      <>
        <Pleaseaddsomedata />
      </>
    );
  }

  return (
    <>
      <Layout>
        <Heading text="Calendar Report"></Heading>
        <Errorui showContent={showContent}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              overflow: "auto",
              marginBottom: 0,
            }}
            className="thebox thepad"
          >
            <div className="days">{days}</div>
            <div className="kasngn">{b}</div>
          </div>
          <p style={{ fontSize: "12px", textAlign: "right" }}>
            Showing data for current Year
          </p>

          <br />

          <div className="thebox thepad calendarmain">
            <Calendardata text="Realized P&L">
              <p
                style={{
                  fontSize: "2em",
                  color: otherdata?.totalProfit > 0 ? "#1fbd06" : "red",
                }}
              >
                {formatNumber(otherdata?.totalProfit, 2)}
              </p>
            </Calendardata>
            <Calendardata text="Fees Paid">
              <p
                style={{
                  fontSize: "2em",
                }}
              >
                {formatNumber(otherdata?.totalFees, 2)}
              </p>
            </Calendardata>
            <Calendardata text="Net P&L">
              <p
                style={{
                  fontSize: "2em",
                  color: otherdata?.totalNetPnl > 0 ? "#1fbd06" : "red",
                }}
              >
                {formatNumber(otherdata?.totalNetPnl, 2)}
              </p>
            </Calendardata>
            <Calendardata text="Trade Count">
              <p
                style={{
                  fontSize: "2em",
                }}
              >
                {otherdata?.totalTrades}
              </p>
            </Calendardata>{" "}
            <Calendardata
              text="Win/Loss Rate"
              theclassName="forcalendarwinrate"
            >
              <Doughnutchart
                chartdatas={[
                  otherdata?.averageWinRate,
                  otherdata?.averageLossRate,
                ]}
                chartlabels={["Win", "Loss"]}
                thecutout="75%"
                theclassName="forcalendar"
                thefontsize="10"
                // disabletext
              />
            </Calendardata>
          </div>

          <br />
          {thefseleceted?.length !== 0 ? (
            <Tradecontent
              theclassName="calendarhere"
              data={thefseleceted?.trades ? thefseleceted?.trades : []}
              disabledelete
            />
          ) : (
            <Thenote>
              <p>Select one from calendar to show trades data</p>
            </Thenote>
          )}
        </Errorui>
      </Layout>
    </>
  );
}

export default Reportcalendar;
