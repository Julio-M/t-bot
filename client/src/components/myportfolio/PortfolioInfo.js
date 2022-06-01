import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function PortfolioInfo (props) {

const displayInfo = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(i => (
  <TableRow key={i} hover role="checkbox">
    <TableCell>
      Asset
      </TableCell>
      <TableCell>
      Price
      </TableCell>
      <TableCell>
        Quantity
      </TableCell>
      <TableCell>
        Market Value
      </TableCell>
      <TableCell>
        Total Profit
      </TableCell>
  </TableRow>
) )

    return (
        <>
        <TableContainer sx={{ maxHeight: '100%' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
              <TableCell>
                Asset
                </TableCell>
                <TableCell>
                Price
                </TableCell>
                <TableCell>
                  Quantity
                </TableCell>
                <TableCell>
                  Market Value
                </TableCell>
                <TableCell>
                  Total Profit
                </TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {displayInfo}
        </TableBody>
        </Table>
      </TableContainer>
        </>
    );
}

export default PortfolioInfo;