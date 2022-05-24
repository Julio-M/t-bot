import React, { useState,useContext } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './linechart.css'
import AuthContext from "../../context/AuthContext";


function MyChart (props) {
  let {liveData} = useContext(AuthContext)
    const data = [
        {
          "name": "Page A",
          "uv": 4000,
          "pv": 2400,
          "amt": 2400
        },
        {
          "name": "Page B",
          "uv": 3000,
          "pv": 1398,
          "amt": 2210
        },
        {
          "name": "Page C",
          "uv": 2000,
          "pv": 9800,
          "amt": 2290
        },
        {
          "name": "Page D",
          "uv": 2780,
          "pv": 3908,
          "amt": 2000
        },
        {
          "name": "Page E",
          "uv": 1890,
          "pv": 4800,
          "amt": 2181
        },
        {
          "name": "Page F",
          "uv": 2390,
          "pv": 3800,
          "amt": 2500
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        }, {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        }, {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        }
      ]
    
    return (
        <>
        <ResponsiveContainer width="100%"   aspect={4.0/2.0}>
            <LineChart className='mychart' data={liveData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                   <CartesianGrid horizontal={false} vertical={false} />
                  <XAxis dataKey="timestamp" />
                  <YAxis/>
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="vwap" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
        </>
    );
}

export default MyChart;