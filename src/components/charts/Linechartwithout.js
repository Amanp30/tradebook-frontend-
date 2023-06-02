import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { formatNumber } from "../../helpers/functions";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

function Linechartwithout({ chartdata, labelsdata }) {
  const htmltheme = document.querySelector("html").classList;
  const themebtn = document.querySelector(".themebtn");
  const [chartsettings, setchartsettings] = useState({
    xcolor: "",
    ycolor: "",
    gridlinecolor: "",
  });

  useEffect(() => {
    setchartsettings({
      xcolor: htmltheme.contains("dark-theme") ? "white" : "black",
      ycolor: htmltheme.contains("dark-theme") ? "white" : "black",
      gridlinecolor: htmltheme.contains("dark-theme") ? "#3c486b57" : "#efefef",
    });
  }, []);

  function handleClick() {
    if (htmltheme.contains("dark-theme")) {
      setchartsettings({
        xcolor: "black",
        ycolor: "black",
        gridlinecolor: "#efefef",
      });
    } else if (htmltheme.contains("light-theme")) {
      setchartsettings({
        xcolor: "white",
        ycolor: "white",
        gridlinecolor: "#3c486b57",
      });
    }
  }

  useEffect(() => {
    themebtn?.addEventListener("click", handleClick);

    return () => {
      themebtn?.removeEventListener("click", handleClick);
    };
  }, [themebtn]);

  const options = {
    plugins: { tooltip: { enabled: true } },
    tension: 0.0,
    animation: false,
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          display: true,
          color: chartsettings.ycolor,
          callback: (value) => formatNumber(value),
        },
        grid: {
          display: true,
          // lineWidth: 5,
          color: chartsettings.gridlinecolor,
          zeroLineColor: "black",
        },
      },
      x: {
        grid: {
          // lineWidth: 5,
          display: true,
          color: chartsettings.gridlinecolor,
        },
        ticks: {
          display: true,
          color: chartsettings.xcolor,
        },
      },
    },
    maintainAspectRatio: false,

    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "orange",
        color: "red",
        callbacks: {
          label: (ctx) => {
            console.log(ctx);
            const trades = ctx[0]?.index;
            return "Profit " + trades;
          },
        },
      },
    },
  };

  const data = {
    labels: labelsdata,
    datasets: [
      {
        data: chartdata,
        segment: {
          borderColor: (ctx) => {
            var val = ctx?.p0?.parsed.y;
            return val >= 0 ? "#116D6E" : "#DF2E38";
          },
        },
        pointRadius: 5,
        pointHoverRadius: 10,
        backgroundColor: (ctx) => {
          var thectx = ctx?.parsed?.y;
          // console.log(ctx);
          return thectx >= 0 ? "#B6E2A1" : "#FF6464";
        },
        hoverBackgroundColor: (ctx) => {
          var thectx = ctx?.parsed?.y;
          // console.log(ctx);
          return thectx >= 0 ? "#116D6E" : "#DF2E38";
        },
      },
    ],
  };

  return (
    <div
      className="reportchart thelinechartfordashboard"
      style={{ width: "100%" }}
    >
      <Line options={options} data={data} />
    </div>
  );
}

export default Linechartwithout;
