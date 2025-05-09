import React from "react";
import { Line } from "react-chartjs-2";

const ActivityTrendsChart = () => {
  const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        label: "Reservations",
        data: [10, 15, 25, 20, 30],
        borderColor: "#2196f3",
        borderWidth: 2,
        tension: 0.4, // Smooth lines
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: { title: { display: true, text: "Days" } },
      y: { title: { display: true, text: "Number of Reservations" } },
    },
  };

  return (
    <div>
      <h3>Activity Trends</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default ActivityTrendsChart;
