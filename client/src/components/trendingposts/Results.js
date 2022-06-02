import React, { useState,useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Results ({analysis,emoji,setEmoji}) {




useEffect( () => {
 if(analysis["negative:"]>analysis["positive:"]){
   setEmoji('😱')
 } else if(analysis["neutral:"]>analysis["positive:"]&&analysis["neutral:"]>analysis["negative:"]){
   setEmoji('😐')
 } else if(analysis["neutral:"]<analysis["positive:"]&&analysis["positive:"]>analysis["negative:"]){
   setEmoji('🤩')
 }
},[analysis])

const displayInfo = [0].map(i => (
  <TableRow key={i} hover role="checkbox">
      <TableCell key={i}>
        {analysis["total:"]}
      </TableCell>
      <TableCell>
        { analysis["positive:"]}
      </TableCell>
      <TableCell>
        {analysis["negative:"]}
      </TableCell>
      <TableCell>
        {analysis["neutral:"]}
      </TableCell>
      <TableCell>
      {emoji}
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