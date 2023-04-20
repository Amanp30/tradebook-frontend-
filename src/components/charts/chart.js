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
}) {
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
    animation: false, // disable animation

    // indexAxis: "y",
    scales: {
      y: {
        grid: {
          color: chartsettings.gridlinecolor,
        },
        ticks: {
          beginAtZero: true,
          color: chartsettings.ycolor, // set font color here
        },
        title: {
          display: true,
          text: ytitle,
          color: chartsettings.ycolor,
          font: {
            size: 12,
            weight: "normal",
          },
          align: "end",
        },
      },
      x: {
        ticks: { color: chartsettings.xcolor },
        grid: {
          color: chartsettings.gridlinecolor, // Change the color of the horizontal grid lines
        },
        // offset: true,
        title: {
          display: true,
          text: xtitle,
          color: chartsettings.ycolor,
          font: {
            size: 12,
            weight: "normal",
          },
          align: "end",
        },
      },
    },
    responsive: true,
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
    onHover: (event, chartElement) => {
      //   console.log(chartElement);
      if (chartElement?.length) {
        const labelIndex = chartElement[0].index;
        const label = labels[labelIndex];
        const hoveredIndex = label ? labels.indexOf(label) : null;
        setHoveredIndex(hoveredIndex);
      }
    },
    onClick: (event, chartElement) => {
      if (chartElement?.length) {
        console.log("Clicked bar data:", profitandloss[chartElement[0].index]);
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
        label: "PNL",
        data: profitandloss,
        backgroundColor: color,
        borderColor: "gold",
        categorySpacing: 0.3,
        barThickness: "flex",
        borderWidth: profitandloss?.map((_, i) =>
          i === hoveredIndex ? 10 : 0
        ),
        lineTension: 5,
      },
      //   {
      //     label: "FEE",
      //     data: data3,
      //     backgroundColor: "orange",
      //     lineTension: 0,
      //   },
    ],
  };

  return (
    <>
      <div
        style={{
          width: "auto",
          margin: "auto",
          marginBottom: "4em",
          //   height: "700px",
        }}
      >
        <Bar options={options} data={data} />

        <p style={{ height: "4em" }}>
          {" "}
          {hoveredIndex && <>{profitandloss[hoveredIndex]}</>}
        </p>
      </div>
    </>
  );
}

export default Chart;
