import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const options = {
  plugins: { tooltip: { enabled: false } },
  tension: 0.2,
  animation: false,
  scales: {
    y: {
      ticks: { beginAtZero: true },
      display: false,
      grid: {
        color: "transparent",
      },
      ticks: {
        display: false,
      },
      color: "rgba(0,0,0,0)",
    },
    x: {
      display: false,
      grid: {
        display: false,
        color: "transparent",
      },
      ticks: {
        display: false,
      },
      color: "rgba(0,0,0,0)",
      borderWidth: 0,
    },
  },
  // showLine: true,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },

    tooltip: {
      enabled: false,
    },
  },
};

function Linechart({ chartdata }) {
  const data = {
    labels: chartdata,
    datasets: [
      {
        // label: "Dataset 1",
        data: chartdata,
        borderColor: "orange",
        borderWidth: 2,
        backgroundColor: "transparent",
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };
  return (
    <div
      className="reportchart thelinechartfordashboard"
      // style={{ width: "100px" }}
    >
      <Line options={options} data={data} />
    </div>
  );
}

export default Linechart;
