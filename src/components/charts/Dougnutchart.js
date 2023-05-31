import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { truncate } from "lodash";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

export function Doughnutchart({
  chartdatas,
  chartlabels,
  disabletext,
  thecutout,
  theclassName,
  thefontsize,
  thecolor = ["green", "red"],
}) {
  const htmltheme = document.querySelector("html").classList;
  const themebtn = document.querySelector(".themebtn");
  const [chartsettings, setchartsettings] = useState({
    textColor: "",
  });

  useEffect(() => {
    setchartsettings({
      textColor: htmltheme.contains("dark-theme") ? "white" : "black",
    });
  }, []);

  function handleClick() {
    if (htmltheme.contains("dark-theme")) {
      setchartsettings({
        textColor: "black",
      });
    } else if (htmltheme.contains("light-theme")) {
      setchartsettings({
        textColor: "white",
      });
    }
  }

  useEffect(() => {
    themebtn?.addEventListener("click", handleClick);

    return () => {
      themebtn?.removeEventListener("click", handleClick);
    };
  }, [themebtn]);

  const [textdata, setTextdata] = useState({
    label: "",
    percent: "",
  });

  useEffect(() => {
    setTextdata({
      label: chartlabels[0],
      percent: `${chartdatas[0]}%`,
    });
  }, [chartdatas]);

  const options = {
    cutout: thecutout ? thecutout + "%" : "60%",
    animation: false,
    rotation: -75,
    onClick: (event, chartElements) => {
      if (chartElements.length > 0) {
        const chartIndex = chartElements[0].index;
        setTextdata({
          percent: chartdatas[chartIndex] + "%",
          label: chartlabels[chartIndex],
        });
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      centerText: {
        display: disabletext ? false : true,
        thepercent: textdata.percent,
        thelabel: textdata.label,
        percentColor: chartsettings.textColor,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  ChartJS.register({
    id: "centerText",
    afterDraw: (chart) => {
      const { ctx, width, height } = chart;

      const plugin = chart.options.plugins.centerText;
      if (!plugin?.display) {
        return;
      }
      const xCoor = width / 2;
      const yCoor = height / 2;

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = plugin.percentColor;
      ctx.font = `bolder ${thefontsize}px sans-serif`;
      ctx.fillText(plugin.thepercent, xCoor, yCoor - 8);
      // ctx.fillStyle = "orange";
      // ctx.font = ` 15px sans-serif`;
      ctx.fillText(plugin.thelabel, xCoor, yCoor + 8);
      ctx.restore();
    },
  });

  const data = {
    labels: chartlabels,
    datasets: [
      {
        data: chartdatas,
        backgroundColor: thecolor,
        borderColor: "transparent",
        // hoverBorderColor: ["green", "red"],
        borderWidth: 5,
      },
    ],
  };

  var dougnutclass = theclassName
    ? theclassName + " dougnutresponsive"
    : "dougnutresponsive";
  return (
    <>
      <div className={dougnutclass}>
        <Doughnut data={data} options={options} />
      </div>
    </>
  );
}
