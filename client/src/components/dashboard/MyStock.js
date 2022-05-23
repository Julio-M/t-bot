import React, { useState } from "react";
import './mystock.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

function MyStock (props) {

  const myAssets = [0,2,3,43,543,546,46,575,87,453]

  const displayBookings = myAssets.map((row) => (
    <TableRow
      key={row}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
      {<img className='profile-pic-book' src={row} alt='some profile'/> }
        {row}
      </TableCell>
      <TableCell align="right">{row}</TableCell>
      <TableCell align="right">
      <img className='profile-pic-book' src={row} alt='some profile'/> 
      </TableCell>
      <TableCell align="right">{row}</TableCell>
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