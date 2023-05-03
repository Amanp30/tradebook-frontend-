import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getCalenderReport } from "../services/apiEndpoints";
import moment from "moment";
import { getDatesForCurrentYear } from "../helpers/functions";

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

  const b = yeararray.map((date) => {
    const found = data.some((d) => d._id.includes(date));
    // console.log(found);
    const foundData = data.find((d) => d._id.includes(date));
    return (
      <div
        key={date}
        style={{
          background:
            found && foundData.profitinrs > 0
              ? "green"
              : foundData && foundData.profitinrs < 0
              ? "red"
              : "grey",
          color: "white",
          width: "10px",
          height: "10px",
        }}
        onClick={() =>
          foundData ? setthefseleceted(foundData) : "No data found"
        }
      >
        {/* {moment(date).format("D")} */}
        {/* {found ? date + "In data true " : `${date} not in data`} */}
      </div>
    );
  });

  return (
    <>
      <Layout>
        <div className="kasngn">{b}</div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <p> {thefseleceted && thefseleceted._id}</p>
        {thefseleceted?.trades?.map((item) => {
          return (
            <>
              <p>
                {item.symbol} - {item.profit}
              </p>
            </>
          );
        })}
      </Layout>
    </>
  );
}

export default Reportcalendar;
