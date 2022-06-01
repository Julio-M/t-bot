import React,{useState} from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


function PortfolioChart ({myPositions,portfolioData}) {
  
  const [chartData,setChartData]=useState({})


    return (
      <ResponsiveContainer width="100%" aspect={4.0/2}>
      <AreaChart
        width={500}
        height={1000}
        data={portfolioData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >

        <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
        <XAxis dataKey="timestamp" tick={false} axisLine={false}/>
        <YAxis domain={['dataMin', 'dataMax']} tick={false} axisLine={false}/>
        <Tooltip />
        <Area type="monotone" dataKey="equity" stroke="#8884d8" fill="#e6e6e6" />
      </AreaChart>
    </ResponsiveContainer>
    );
}

export default PortfolioChart;