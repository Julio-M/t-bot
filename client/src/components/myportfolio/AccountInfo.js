import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function AccountInfo ({myAccount}) {

const displayInfo = [0].map(i => (
  <TableRow key={i} hover role="checkbox">
    <TableCell key={i}>
      USD$
      </TableCell>
      <TableCell key={i}>
        {myAccount?parseInt(myAccount.equity).toFixed():'Loading...'}
      </TableCell>
      <TableCell>
        {myAccount?parseInt(myAccount.buying_power).toFixed():'Loading...'}
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
                  Currency
                </TableCell>
                <TableCell>
                  Equity
                </TableCell>
                <TableCell>
                  Buying Power
                </TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {displayInfo}
        </TableBody>
        </Table>
      </TableContainer>
      <img id='cracked' src="https://www.transparentpng.com/thumb/robot/gray-sitting-robot-transparent-hd--AvW2K5.png" alt="gray sitting robot transparent hd @transparentpng.com"/>
      </>
    );
}

export default AccountInfo;