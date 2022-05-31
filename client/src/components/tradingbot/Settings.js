import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function Settings ({assets,setMySettings, mySettings}) {
  console.log('From settings', assets)
  const allTickers = assets.map(item => item.ticker)
  const handleChange = (e) => {
    let value = e.target.textContent
    setMySettings({...mySettings, 'symbol':value})
  }
  return (
    <>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={allTickers}
      sx={{ width: '100%' }}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} label="Asset" />}
    />
    </>
  );
}

export default Settings;