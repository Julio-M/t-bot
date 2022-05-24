import React, { useState,useContext } from "react";
import './mystock.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import AuthContext from "../../context/AuthContext";


function MyStock (props) {
  let {myPositions} = useContext(AuthContext)

  const displayBookings = myPositions.map((row) => (
    <TableRow
      key={row.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
      {<img className='profile-pic-book' src={row.symbol} alt='some profile'/> }
        {row.id}
      </TableCell>
      <TableCell align="right">{row.symbol}</TableCell>
      <TableCell align="right">
      <img className='profile-pic-book' src={row.asset_id} alt='some profile'/> 
      </TableCell>
      <TableCell align="right">${row.current_price}</TableCell>
    </TableRow>
  ))

    return (
        <>
        <TableContainer>
            <Table sx={{ minWidth: "100%"}} aria-label="simple table">
              <TableBody>
                {displayBookings}
              </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}

export default MyStock;