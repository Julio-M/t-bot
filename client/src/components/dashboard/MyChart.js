import React, { useState,useContext } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './linechart.css'
import AuthContext from "../../context/AuthContext";


function MyChart ({options}) {
    let {liveData} = useContext(AuthContext)

    const convertingDate = liveData.map(el => {
        const c = new Date(el.timestamp).toLocaleTimeString('en-US',
        options
        )
        return {...el,c}
    });

    console.log('from chart',convertingDate)

    const waitingForMarket = (<div className='load-market'>
    <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    <p className='text-load'>Waiting for the market to open.....</p>
    </div>
    )
    
    return (
        <>
        <ResponsiveContainer className='chart-container' width="100%" aspect={4.0/2.0}>
            {convertingDate.length>0?<LineChart className='mychart' data={convertingDate}
                  margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid horizontal={false} vertical={false} />
                  <XAxis classNmae='data-shown' dataKey="c"/>
                  <YAxis  type="number" domain={['dataMin - 2', 'dataMax']} tick={false} axisLine={false}/>
                  <Tooltip cursor={false}  />
                  <Legend />
                  <Line type="monotone" dataKey="vwap" stroke="#DC143C" />
          </LineChart>:waitingForMarket}
        </ResponsiveContainer>
        </>
    );
}

export default MyChart;