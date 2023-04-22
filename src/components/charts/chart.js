import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
const formatNumber = (num) => {
  if (num < 0) {
    return "-" + formatNumber(-num);
  } else if (num >= 10000000) {
    return (num / 10000000).toFixed(1) + " Cr";
  } else if (num >= 100000) {
    return (num / 100000).toFixed(1) + " L";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + " K";
  } else if (num >= 10000000 * 100) {
    return (num / (10000000 * 100)).toFixed(1) + " Arab";
  } else if (num >= 10000000 * 100 * 100) {
    return (num / (10000000 * 100 * 100)).toFixed(1) + " Kharab";
  } else {
    return num;
  }
};

function Chart({
  charttitle,
  label,
  profitandloss,
  color,
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
        callbacks: {
          label: (tooltipItem) => {
            const trades = tradecount[tooltipItem.index];
            return `Trades: ${tradecount[hoveredIndex]}`;
          },
        },
      },
    },
    // onHover: (event, chartElement) => {
    //   //   console.log(chartElement);
    //   if (chartElement?.length) {
    //     const labelIndex = chartElement[0].index;
    //     const label = labels[labelIndex];
    //     const hoveredIndex = label ? labels.indexOf(label) : null;
    //     setHoveredIndex(hoveredIndex);
    //   }
    // },
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
        backgroundColor: color,
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
    </>
  );
}

export default Chart;
