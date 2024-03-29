import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { colorchartjs } from "colorchartjs";
import { formatNumber } from "../../helpers/functions";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

function Chart({
  charttitle,
  label,
  profitandloss,
  tradecount,
  xtitle,
  ytitle,
  hoveredIndex,
  setHoveredIndex,
  percentarray,
  showoptions = true,
}) {
  const htmltheme = document.querySelector("html").classList;
  const themebtn = document.querySelector(".themebtn");
  const [chartsettings, setchartsettings] = useState({
    xcolor: "",
    ycolor: "",
    gridlinecolor: "",
  });

  const [isprofitloss, setisprofitloss] = useState(true);
  const showingdatafor = isprofitloss ? profitandloss : percentarray;

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

  var thechartbgcolorinrupees = profitandloss
    ? colorchartjs(profitandloss, "#2E7D32", "#D32F2F", 0)
    : null;

  var thechartbgcolorinpercent = percentarray
    ? colorchartjs(percentarray, "#2E7D32", "#D32F2F", 0)
    : null;

  const options = {
    animation: false, // disable animation

    // indexAxis: "y",
    scales: {
      y: {
        grid: {
          color: chartsettings.gridlinecolor,
        },
        ticks: {
          beginAtZero: true,
          fontSize: 8,
          color: chartsettings.ycolor, // set font color here
          callback: (value) =>
            isprofitloss ? formatNumber(value) : value + "%",
        },
        title: {
          display: false,
          text: ytitle,
          color: chartsettings.ycolor,
          font: {
            size: 8,
            weight: "normal",
          },
          align: "end",
        },
      },
      x: {
        ticks: {
          color: chartsettings.xcolor,
          fontSize: 8,
          callback: function (value, index) {
            return labels[value];
          },
        },
        grid: {
          color: chartsettings.gridlinecolor, // Change the color of the horizontal grid lines
        },
        // offset: true,
        title: {
          display: false,
          text: xtitle,
          color: chartsettings.ycolor,
          font: {
            size: 8,
            weight: "normal",
          },
          align: "end",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      title: {
        display: true,
        text: charttitle,
      },
      tooltip: {
        displayColors: false,
        enabled: true,
        labelTextColors: ["red"],
        backgroundColor: "black",
        title: ["oasdg"],
        callbacks: {
          label: (tooltipItem) => {
            var tooltipY = tooltipItem?.parsed?.y;
            var plvalue = profitandloss[tooltipItem.dataIndex].toFixed(2);
            console.log(tooltipItem);

            return [
              `-- Trades: ${tradecount[tooltipItem.dataIndex]}`,
              `${
                tooltipY >= 0 ? "-- Profit: " + plvalue : "-- Loss: " + plvalue
              }`,
              `-- Avg %: ${percentarray[tooltipItem?.dataIndex].toFixed(2)}`,
            ];
          },
        },
      },
    },

    onClick: (event, chartElement) => {
      if (chartElement?.length) {
        // console.log("Clicked bar data:", profitandloss[chartElement[0].index]);
        setHoveredIndex(chartElement[0].index);
        // alert(5);
      }
    },
  };

  const labels = label;

  const data = {
    labels,
    datasets: [
      {
        // label: "PNL",
        data: showingdatafor,
        backgroundColor: isprofitloss
          ? thechartbgcolorinrupees
          : thechartbgcolorinpercent,
        borderColor: "gold",
        hoverBorderRadius: 10,
        inflateAmount: "auto",
        categorySpacing: 0.3,
        barThickness: "flex",
        borderWidth: showingdatafor?.map((_, i) =>
          i === hoveredIndex ? 5 : 0
        ),
        lineTension: 5,
      },
    ],
  };
  const profitClass = isprofitloss ? "profittrue" : "";
  const percentClass = !isprofitloss ? "percenttrue" : "";

  return (
    <>
      {showoptions ? (
        <div className="charttabs">
          <p style={{ fontSize: "14px" }}>Performance:</p>
          <p
            className={`${profitClass} thetabchange`}
            onClick={() => setisprofitloss(true)}
          >
            ₹
          </p>
          <p
            className={`${percentClass} thetabchange`}
            onClick={() => setisprofitloss(false)}
          >
            %
          </p>
        </div>
      ) : null}
      <div className="reportchart">
        <Bar options={options} data={data} />
      </div>
      {isprofitloss ? null : (
        <p style={{ fontSize: "12px", marginTop: "2em" }}>
          Showing average return percent data.
        </p>
      )}
    </>
  );
}

export default Chart;
