import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
const data = [
    {name: 'Page A', uv: 400, pv: 2400, amt: 1200},
    {name: 'Page B', uv: 400, pv: 2400, amt: 1600},
    {name: 'Page C', uv: 400, pv: 2400, amt: 2300}
];

const renderLineChart = (
  <LineChart width={600} height={300} data={data}>
    <Line type="monotone" dataKey="amt" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="name" />
    <YAxis />
  </LineChart>
);

export default function MyChart() {
    return (
        <>
            <h1>Testing charts</h1>
            {renderLineChart}
        </>
    )
}