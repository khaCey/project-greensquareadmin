import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import styled from "styled-components";

const data = [
  { month: 'Jan', sales: 4000, revenue: 2400, students: 7 },
  { month: 'Feb', sales: 3000, revenue: 1398, students: 6 },
  { month: 'Mar', sales: 2000, revenue: 9800, students: 1 },
  { month: 'Apr', sales: 2780, revenue: 3908, students: 6 },
  { month: 'May', sales: 1890, revenue: 4800, students: 8 },
  { month: 'Jun', sales: 2390, revenue: 3800, students: 5 },
  { month: 'Jul', sales: 3490, revenue: 4300, students: 3 },
  // ...
];

const RevenueBanner = styled.div`
  height: 25em;
  width: 100%;
  margin-bottom: 1em;
  display: flex;
`;

const Left = styled.div`
  flex-grow: 1;
  height: 100%;
  background-color: #2B2F33;
  margin-right: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Right = styled.div`
  flex-grow: 1;
  height: 100%;
  background-color: #2B2F33;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Revenue  = ({ employeeID }) => {
  return (
    <RevenueBanner>
      <Left>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
        </LineChart>
      </Left>
      <Right>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="students" fill="#8884d8" />
        </BarChart>
      </Right>
    </RevenueBanner>
  );
};

export default Revenue;
