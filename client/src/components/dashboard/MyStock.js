import React, { useState,useContext } from "react";
import './mystock.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import AuthContext from "../../context/AuthContext";
import { TableHead } from "@mui/material";



function MyStock (props) {
  let {assets,setCurrAsset} = useContext(AuthContext)

  const handleClick = (e) => {
    setCurrAsset(e.target.getAttribute("value"))
  }

  const displayAssets = assets.map((row) => (
    <TableRow
      onClick={handleClick} 
      hover
      key={row.ticker}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell  value={row.ticker} component="th" scope="row">
      {<img value={row.ticker} className='asset-logo-pic' src={row.name} alt='logo'/> }
        {row.id}
      </TableCell>
      <TableCell value={row.ticker} align="right">{row.name}</TableCell>
      <TableCell value={row.ticker} align="right">{row.ticker}</TableCell>
    </TableRow>
  ))

    return (
        <>
        <TableContainer className='stock-cont'>
            <Table  sx={{ minWidth: "100%"}}>
            <TableHead>
                <TableRow className='headers'>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">Asset</TableCell>
                  <TableCell align="right">Ticker</TableCell>
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

export default MyStock;