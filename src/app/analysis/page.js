"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Navbar from "../components/navbar";

import styles from "./analysis.module.scss";

const navLinks = [
  {
    link: "/",
    data: "Go to Home",
  },
  {
    link: "/frame",
    data: "Go to Surfing",
  },
];

// Register necessary components with Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analysis = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const visitedWebsites =
      JSON.parse(localStorage.getItem("visitedWebsites")) || [];

    const domainNames = visitedWebsites.map((site) => site.name);
    const timeSpent = visitedWebsites.map((site) =>
      (site.timeSpent / 60000).toFixed(2)
    ); // Convert time to minutes and round to 2 decimal places

    // Set up chart data
    setChartData({
      labels: domainNames,
      datasets: [
        {
          label: "Time Spent (minutes)",
          data: timeSpent,
          backgroundColor: "#16f1ff",
          borderColor: "#16f1ff",
          borderWidth: 1,
        },
      ],
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <Navbar link1={navLinks[0]} link2={navLinks[1]}></Navbar>

      <div className={styles.main}>
        <div className={styles.title}>
          <p className={styles.titlePara}>
            Website <span className={styles.center}>Analysis</span>
          </p>
        </div>

        <div className={styles.chartData}>
          <div
            // style={{ width: "600px", margin: "auto" }}
            className={styles.chartDiv}
          >
            {chartData ? (
              <Bar
                data={chartData}
                options={{
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Websites",
                      },
                    },
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: "Time Spent (seconds)",
                      },
                    },
                  },
                }}
              />
            ) : (
              <p>No data available for analysis.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
