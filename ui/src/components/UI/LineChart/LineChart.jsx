
import React, { useState } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { SlOptionsVertical } from "react-icons/sl";
import "./LineChart.scss";

const labels = [
  [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"
  ],
  ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
  [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ],
  [
    "1/2024", "2/2024", "3/2024", "4/2024", "5/2024", "6/2024",
    "7/2024", "8/2024", "9/2024", "10/2024", "11/2024", "12/2024",
    "1/2025", "2/2025", "3/2025", "4/2025", "5/2025", "6/2025",
    "7/2025", "8/2025", "9/2025", "10/2025", "11/2025", "12/2025"
  ]
];


const LineChart = () => {

  const [openOption, setOpenOption] = useState(0);
  const [labelOptions, setLabelOptions] = useState(0)

  const data = {
    labels: labels[labelOptions],
    datasets: [
      {
        label: "Cân nặng cơ thể",
        backgroundColor: "rgb(255, 99, 245)",
        borderColor: "rgb(255, 99, 255)",
        data: [60, 70, 80, 90, 100, 82],
        spanGaps: true,
      },

      {
        label: "Kl mỡ",
        backgroundColor: "rgb(229, 255, 99)",
        borderColor: "rgb(229, 255, 99)",
        data: [22, 26, 28, 33, 7, 17],
        spanGaps: true,
      },
      {
        label: "Kl cơ bắp",
        backgroundColor: "rgb(255, 99, 99)",
        borderColor: "rgb(255, 99, 99)",
        data: [30, 37, 44, null, 40, 35],
        spanGaps: true,
      },
    ],
  };
  React.useEffect(() => {
    if (!openOption) return;
    const handleClickOutside = (event) => {
      const optionsContainer = document.querySelector('.line-chart-options-container');
      const optionBtn = document.querySelector('.line-chart-option-btn');
      if (
        optionsContainer &&
        !optionsContainer.contains(event.target) &&
        optionBtn &&
        !optionBtn.contains(event.target)
      ) {
        setOpenOption(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openOption]);
  return (
    <div className="line-chart-container">
      <div className="line-chart-option-btn" onClick={() => setOpenOption((prevState) => !prevState)}><SlOptionsVertical /></div>
      <div className="line-chart-options-container" style={openOption ? { display: 'block' } : { display: 'none' }}>
      <p>Chỉnh thời gian</p>
      <button className="line-chart-options" onClick={() => setLabelOptions(0)} style={labelOptions == 0 ? { backgroundColor: 'var(--navbar-dark-secondary)' } : {}}>30 ngày qua</button>
      <button className="line-chart-options" onClick={() => setLabelOptions(1)} style={labelOptions == 1 ? { backgroundColor: 'var(--navbar-dark-secondary)' } : {}}>6 tháng qua</button>
      <button className="line-chart-options" onClick={() => setLabelOptions(2)} style={labelOptions == 2 ? { backgroundColor: 'var(--navbar-dark-secondary)' } : {}}>1 năm qua</button>
      <button className="line-chart-options" onClick={() => setLabelOptions(3)} style={labelOptions == 3 ? { backgroundColor: 'var(--navbar-dark-secondary)' } : {}}>2 năm qua</button>
      </div>
      <Line
      style={{ width: "100%", height: "100%" }}
      data={data}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
        legend: {
          position: "top",
          labels: {
            color: "white",
            boxWidth: 16,
            boxHeight: 16,
            font: {
              size: 12,
              weight: "bold",            },
          },
        },
        },
        scales: {
        y: {
          ticks: {
          callback: function(value) {
            return value + ' kg';
          }
          }
        }
        }
      }}
      />
    </div>
    );
};

export default LineChart;