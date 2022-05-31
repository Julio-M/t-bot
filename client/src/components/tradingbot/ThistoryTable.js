import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function ThistoryTable (props) {

const displayInfo = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(i => (
  <TableRow key={i} hover role="checkbox">
      <TableCell key={i}>
      AAPL
      </TableCell>
      <TableCell>
        05/03/2022
      </TableCell>
      <TableCell>
        Martingale
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
                  Date
                </TableCell>
                <TableCell>
                  Strategy
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

export default ThistoryTable;