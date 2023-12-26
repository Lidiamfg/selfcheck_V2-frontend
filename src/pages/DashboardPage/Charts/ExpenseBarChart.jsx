import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const ExpenseBarChart = ({ expenses }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const amounts = Array(months.length).fill(0);
  expenses.forEach((expense) => {
    const monthIndex = months.indexOf(expense.month);
    if (monthIndex !== -1) {
      amounts[monthIndex] += expense.amount;
    }
  });
  const options = {
    aspectRatio: 1.2,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const data = {
    labels: months,

    datasets: [
      {
        label: "expense",
        data: amounts,
      },
    ],
  };
  return (
    <div style={{ width: "80%", height: "300px" }}>
      {/*this height is definying the max height for the graph*/}
      <Line options={options} data={data} />
    </div>
  );
};

export default ExpenseBarChart;
