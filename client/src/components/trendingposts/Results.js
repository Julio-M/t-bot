import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Results (props) {

const displayInfo = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(i => (
  <TableRow key={i} hover role="checkbox">
      <TableCell key={i}>
       Index
      </TableCell>
      <TableCell>
        Result
      </TableCell>
      <TableCell>
      1
      </TableCell>
      <TableCell>
      1
      </TableCell>
      <TableCell>
      1
      </TableCell>
  </TableRow>
) )

    return (
        <>
        <TableContainer sx={{ maxHeight: '100%', maxWidth:'100%', borderRadius:'30px' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
              <TableCell>
                   Total tweets
                  </TableCell>
                  <TableCell>
                   Positive
                  </TableCell>
                  <TableCell>
                    Negative
                  </TableCell>
                  <TableCell>
                     Neutral
                  </TableCell>
                  <TableCell>
                  🫥
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

export default Results;