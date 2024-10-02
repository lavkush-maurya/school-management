// src/components/Dashboard.js
import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from 'chart.js';
import { Pie, Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

// Random static data
const dataPie = {
  labels: ['Profit', 'Expenses', 'Teacher Salary', 'Student Fees'],
  datasets: [
    {
      label: 'School Financial Overview',
      data: [30000, 15000, 20000, 25000],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const dataBar = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Monthly Fees Collected',
      data: [5000, 7000, 8000, 6000, 9000, 10000],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

const dataLine = {
  labels: ['2021', '2022', '2023', '2024', '2025'],
  datasets: [
    {
      label: 'Student Enrollment Over Years',
      data: [150, 200, 250, 300, 350],
      fill: false,
      backgroundColor: 'rgba(255, 206, 86, 1)',
      borderColor: 'rgba(255, 206, 86, 1)',
      tension: 0.1, // Smooth line curve
    },
  ],
};

const dataDoughnut = {
  labels: ['Infrastructure', 'Staffing', 'Utilities', 'Others'],
  datasets: [
    {
      label: 'Expenses Breakdown',
      data: [5000, 12000, 3000, 2000],
      backgroundColor: [
        'rgba(255, 159, 64, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(255, 159, 64, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const Dashboard = () => {
  return (
    <div className="p-4 mt-20 lg:mx-28 md:mx-16 mx-0">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">Welcome to the School Management System! Here's an overview of our financials and student enrollment trends.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold">Student Enrollment Over Years (Line Chart)</h2>
          <Line 
            data={dataLine} 
            options={{
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.parsed.y} students`,
                  },
                },
              },
            }} 
          />
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold">Monthly Fees Collected (Bar Chart)</h2>
          <Bar 
            data={dataBar} 
            options={{
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.dataset.label}: $${context.parsed.y}`,
                  },
                },
              },
            }} 
          />
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold">Financial Overview (Pie Chart)</h2>
          <Pie 
            data={dataPie} 
            options={{
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.label}: $${context.parsed}`,
                  },
                },
              },
            }} 
          />
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold">Expenses Breakdown (Doughnut Chart)</h2>
          <Doughnut 
            data={dataDoughnut} 
            options={{
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.label}: $${context.parsed}`,
                  },
                },
              },
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
