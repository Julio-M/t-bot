import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

function OrderHistory ({assets,myPositions,setNewOrder,newOrder}) {

  const [formError,setFormError] = useState('')

  const [myOrder,setMyOrder] = useState({
    "order_type":"",
    "quantity":0,
    "symbol":""
  })

  const tickers = assets.map(el => el.ticker)
  const symbols = myPositions.map(el=>el.symbol)
  const all = tickers.concat(symbols)
  let unique = all.filter((item,index) => all.indexOf(item) === index)

  const handleChange = (e) => {
    let value = e.target.textContent
    setMyOrder({...myOrder, "symbol":value})
  }

  const handleRadio = (e) => {
    setMyOrder({...myOrder,"order_type":e.target.value});

  };

  const handleQuan =(e) => {
    setMyOrder({...myOrder,"quantity":parseInt(e.target.value)});
  }

  const handleSubmit =(e) => {
   e.preventDefault()
   console.log('subm')
   fetch(`http://localhost:8000/api/place-order`, {
       method: "POST",
       headers: {
           "Content-Type": "application/json",
           Accept: "application/json"
       },
       body: JSON.stringify(myOrder)
   })
   .then( res => res.json())
   .then( data => setNewOrder(data))
   .catch( error => setFormError('Please make sure all the fields are completed'));
  }

const displayInfo = newOrder.length>0?newOrder.map(i => (
  <TableRow key={i} hover role="checkbox">
       <TableCell>
       {i.symbol}
        </TableCell>
        <TableCell>
        {i.side}
        </TableCell>
        <TableCell>
          {i.qty}
        </TableCell>
        <TableCell>
          {i.submitted_at}
        </TableCell>
  </TableRow>
)):null

    return (
        <>

        <Grid container spacing={2}>
            <Grid zeroMinWidth item xs={12} sm={12}>
            <form onSubmit={handleSubmit}>
            <FormControl id="form">
              <FormLabel id="form-label">Place order</FormLabel>
              <div className='controls' id='orders'>
                    <Autocomplete
                      disablePortal
                      id="combo-box-port"
                      options={unique}
                      sx={{ width: '100%'}}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} label="Asset" />}
                    />
                </div>
                <div className='radiobtn'>
                <RadioGroup
                      row
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      id='radio'
                      value={myOrder.order_type}
                      onChange={handleRadio}
                    >
                      <FormControlLabel value="sell" control={<Radio />} label="Sell" />
                      <FormControlLabel value="buy" control={<Radio />} label="Buy" />
                </RadioGroup>
                </div>
                <div className='quantity'>
                <TextField
                    id="outlined-number"
                    label="Quantity"
                    type="number"
                    onChange={handleQuan}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className='btn'>
                <Button type="submit" variant="contained" color="success">
                  Submit Order
                </Button>
                </div>
              </FormControl>
              <p style={{color:"red"}}>{formError?formError:null}</p>
              </form>
            </Grid>
              <Grid zeroMinWidth item xs={12} sm={12}>
                <TableContainer sx={{ maxHeight: '100%' }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                      <TableCell>
                        Asset
                        </TableCell>
                        <TableCell>
                        Order type
                        </TableCell>
                        <TableCell>
                          Quantity
                        </TableCell>
                        <TableCell>
                          Submitted
                        </TableCell>
                    </TableRow>
                  </TableHead>
                <TableBody>
                  {displayInfo}
                </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </>
    );
}

export default OrderHistory;