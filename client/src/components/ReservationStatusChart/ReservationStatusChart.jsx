import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const ReservationStatusChart = () => {
  const data = [
    { name: "Approved", value: 60 },
    { name: "Rejected", value: 40 },
  ];

  const COLORS = ["#4caf50", "#f44336"]; // Colors for approved and rejected

  return (
    <div>
      <h3>Reservation Status Summary</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx={200}
          cy={150}
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default ReservationStatusChart;
