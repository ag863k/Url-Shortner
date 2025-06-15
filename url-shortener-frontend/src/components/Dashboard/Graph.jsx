import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);

const Graph = ({ graphData }) => {
  const labels = graphData?.map((item, i) => `${item.clickDate}`);
  const userPerDaya = graphData?.map((item) => item.count);

  const data = {
    labels:
     graphData.length > 0
        ? labels
        : ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Total Clicks",
        data:
         graphData.length > 0
            ? userPerDaya
            : [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
        backgroundColor:
         graphData.length > 0 ? "#10b981" : "rgba(16, 185, 129, 0.1)",
        borderColor: "#059669",
        pointBorderColor: "#10b981",
        fill: true,
        tension: 0.4,
        barThickness: 20,
        categoryPercentage: 1.5,
        barPercentage: 1.5,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#ffffff'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#ffffff',
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value.toString();
            }
            return "";
          },
        },
        title: {
          display: true,
          text: "Number Of Clicks",
          color: '#ffffff',
          font: {
            family: "Arial",
            size: 16,
            weight: "bold",
          },
        },
        grid: {
          color: '#374151'
        }
      },
      x: {
        beginAtZero: true,
        ticks: {
          color: '#ffffff'
        },
        title: {
          display: true,
          text: "Date",
          color: '#ffffff',
          font: {
            family: "Arial",
            size: 16,
            weight: "bold",
          },
        },
        grid: {
          color: '#374151'
        }
      },
    },
  };

  return <Bar className=" w-full" data={data} options={options}></Bar>;
};

export default Graph;