import React, { useState,useContext } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './linechart.css'
import AuthContext from "../../context/AuthContext";


function MyChart (props) {
    let {liveData} = useContext(AuthContext)
    
    return (
        <>
        <ResponsiveContainer width="100%" aspect={4.0/2.0}>
            <LineChart className='mychart' data={liveData}
                  margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                   <CartesianGrid horizontal={false} vertical={false} />
                  <XAxis dataKey="timestamp" />
                  <YAxis  type="number" domain={['dataMin - 2', 'dataMax']} tick={false} axisLine={false}/>
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="vwap" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
        </>
    );
}

export default MyChart;