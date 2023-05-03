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

  const b = mdate.map((monthDates, index) => (
    <div key={index} className="twelveone">
      <h2 style={{ fontSize: ".8em", marginBottom: ".5em" }}>
        {monthNames[index]}
      </h2>
      <div>
        {monthDates.map((date) => {
          const foundData = data.find((d) => d._id.includes(date));

          //   console.log(date);
          return (
            <>
              <div
                key={date}
                style={{
                  background:
                    date === ""
                      ? "transparent"
                      : foundData?.profitinrs > 0
                      ? "green"
                      : foundData?.profitinrs < 0
                      ? "red"
                      : "#bebebe",
                  color: "white",
<<<<<<< HEAD
                  height: ".8em",
                  width: ".8em",
=======
                  width: ".8em",
                  height: ".8em",
>>>>>>> origin/main
                }}
                onClick={() =>
                  foundData ? setthefseleceted(foundData) : "No data found"
                }
              >
                {/* {date && moment(date).format("D")} */}
                {/* {foundData ? date + "In data true " : `${date} not in data`} */}
              </div>
            </>
          );
        })}
      </div>
    </div>
  ));

  const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const days = shortDays.map((day, index) => <p>{day}</p>);

  return (
    <>
      <Layout>
        <div style={{ display: "flex", gap: "10px" }} className="thebox">
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
