import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const IncomeBarChart = ({ incomes }) => {
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
  incomes.forEach((income) => {
    const monthIndex = months.indexOf(income.month);
    if (monthIndex !== -1) {
      amounts[monthIndex] += income.amount;
    }
  });
  const options = {
    indexAxis: "y",
    aspectRatio: 1.2,
  };
  const data = {
    labels: months,

    datasets: [
      {
        label: "Income",
        data: amounts,
      },
    ],
  };
  return (
    <div style={{ width: "80%", height: "300px" }}>
      {/*this height is definying the max height for the graph*/}
      <Bar options={options} data={data} />
    </div>
  );
};

export default IncomeBarChart;
