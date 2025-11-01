import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const PerformanceChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="subject" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="marks" fill="#1976d2" name="Marks (%)" />
        <Bar dataKey="attendance" fill="#82ca9d" name="Attendance (%)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;
