import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getCalenderReport } from "../services/apiEndpoints";
import moment from "moment";
import {
  getDatesForCurrentYear,
  getMonthNames,
  monthNames,
} from "../helpers/functions";

function Reportcalendar() {
  const [data, setData] = useState([]);
  const [thefseleceted, setthefseleceted] = useState([]);

  useEffect(() => {
    getCalenderReport().then((res) => {
      //   console.log(res);
      setData(res);
    });
  }, []);

  var yeararray = getDatesForCurrentYear();
  //   console.log(yeararray);

  var months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

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

  const b = mdate.map((monthDates, index) => (
    <div key={index} className="twelveone">
      <h2 style={{ fontSize: ".8em", marginBottom: ".5em" }}>
        {monthNames[index]}
      </h2>
      <div>
        {monthDates.map((date) => {
          const foundData = data.find((d) => d._id.includes(date));

          return (
            <>
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
                    console.log("No data found");
                  }
                }}
              ></div>
            </>
          );
        })}
      </div>
    </div>
  ));

  const shortDays = ["S", "M", "T", "W", "T", "F", "S"];

  const days = shortDays.map((day, index) => <p>{day}</p>);

  return (
    <>
      <Layout>
        <div
          style={{ display: "flex", gap: "10px", overflow: "auto" }}
          className="thebox thepad"
        >
          <div className="days">{days}</div>
          <div className="kasngn">{b}</div>
        </div>

        <br />
        <p> {thefseleceted && thefseleceted._id}</p>
        {thefseleceted?.trades?.map((item) => {
          return (
            <>
              <p>
                {item.symbol} ({item.profit}) ----- {item._id}
              </p>
            </>
          );
        })}
      </Layout>
    </>
  );
}

export default Reportcalendar;
