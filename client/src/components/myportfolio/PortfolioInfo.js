import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function PortfolioInfo ({myPositions}) {

const displayInfo = myPositions.map(i => (
  <TableRow key={i} hover role="checkbox">
    <TableCell>
      {i.symbol}
      </TableCell>
      <TableCell>
      ${i.current_price}
      </TableCell>
      <TableCell>
        {i.qty}
      </TableCell>
      <TableCell>
        {i.market_value}
      </TableCell>
      <TableCell>
        {i.exchange}
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
                  Exchange
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