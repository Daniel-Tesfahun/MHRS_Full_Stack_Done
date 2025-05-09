import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";

const HallPerformanceChart = () => {
  Chart.register(CategoryScale, LinearScale, LineElement, PointElement);

  const data = [
    { name: "Hall A", reservations: 25 },
    { name: "Hall B", reservations: 40 },
    { name: "Hall C", reservations: 20 },
  ];

  return (
    <div>
      <h3>Hall Performance</h3>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="reservations" fill="#ff9800" />
      </BarChart>
    </div>
  );
};

export default HallPerformanceChart;
