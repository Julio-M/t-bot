import React, { useState,useContext } from "react";
import './mystock.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import AuthContext from "../../context/AuthContext";


function MyStock (props) {
  let {assets,setCurrAsset} = useContext(AuthContext)

  const handleClick = (e) => {
    setCurrAsset(e.target.name)
  }

  const displayAssets = assets.map((row) => (
    <TableRow
      onClick={handleClick}
      key={row.ticker}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
      {<img className='profile-pic-book' name={row.ticker} src={row.name} alt='logo'/> }
        {row.id}
      </TableCell>
      <TableCell align="right">{row.name}</TableCell>
      <TableCell align="right">{row.ticker}</TableCell>
    </TableRow>
  ))

    return (
        <>
        <TableContainer className='stock-cont'>
            <Table sx={{ minWidth: "100%"}} aria-label="simple table">
              <TableBody>
                {displayAssets}
              </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}

export default MyStock;