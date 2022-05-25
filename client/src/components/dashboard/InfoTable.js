import React, { useState,useContext } from "react";
import './mystock.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import AuthContext from "../../context/AuthContext";
import { TableHead } from "@mui/material";
import './infotable.css'
import { CSVLink } from "react-csv";
import { FaWpforms } from 'react-icons/fa';


function InfoTable (props) {
  let {currAsset,liveData} = useContext(AuthContext)

  const displayAssets = liveData.slice(0).reverse().map((row) => (
    <TableRow
      hover
      key={row.ticker}
      sx={{ '&:last-child td, &:last-child th': { border: 0} }}
    >
      <TableCell align="right">{currAsset}</TableCell>
      <TableCell align="right">{row.vwap}</TableCell>
      <TableCell align="right">{row.high}</TableCell>
      <TableCell align="right">{row.low}</TableCell>
      <TableCell align="right">{row.open}</TableCell>
      <TableCell align="right">{row.close}</TableCell>
      <TableCell align="right">{row.trade_count}</TableCell>
      <TableCell align="right">{row.timestamp}</TableCell>
    </TableRow>
  ))

    return (
        <>
        <div className='csvexport'>
        <FaWpforms className="ex-ic"/>
        <CSVLink className='ex-title' data={liveData}>Export data</CSVLink>
        </div>
        <TableContainer className='more-info' >
            <Table sx={{ minWidth: "100%",overflow:"hidden"}} >
              <TableHead>
                <TableRow className='headers'>
                  <TableCell align="right">Asset</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">High</TableCell>
                  <TableCell align="right">Low</TableCell>
                  <TableCell align="right">Open</TableCell>
                  <TableCell align="right">Close</TableCell>
                  <TableCell align="right">Trades</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayAssets}
              </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}

export default InfoTable;