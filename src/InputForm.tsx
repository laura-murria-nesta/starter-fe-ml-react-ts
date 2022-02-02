import React, { useState } from "react";
import { Button, FormControl, Grid, TextField, RadioGroup, FormControlLabel, Radio, InputLabel, MenuItem, Select } from '@mui/material';
import { InputParams } from "./model";


export function InputForm(props: { handleSubmit: (input: InputParams)=> {}}) {

    const { 
      handleSubmit,
    } = props;
  
    const [ radio1, setRadio1 ] = useState('');
    const [ dropdown1, setDropdown1 ] = useState('Twenty');
    const [ value1, setValue1 ] = useState(0);
  
    const handleChangeRadio1 = (event: any) => {
      setRadio1(event.target.value);
    };
    const handleChangeDropdown1 = (event: any ) => {
      setDropdown1(event.target.value);
    };
    const handleChangeValue1 = (event: any) => {
      setValue1(event.target.value);
    };
  
    
    return (
            <Grid container>
              <Grid item xs={12}>
                &nbsp;
              </Grid>
              <Grid item xs={12}>
                Select a radio button
                <FormControl component="fieldset" className="formControl">
                  <RadioGroup
                    row
                    aria-label="usage-units"
                    defaultValue={radio1}
                    value={radio1}
                    name="radio-group-1"
                    onChange={handleChangeRadio1}
                  >
                    <FormControlLabel value='GBP' control={<Radio />} label="£" />
                    <FormControlLabel value='USD' control={<Radio />} label="$" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" className="formControl">
                    <TextField
                      id="text-value-1" 
                      label='Enter some text'
                      type="text"
                      onChange={handleChangeValue1} 
                    />   
                </FormControl>
              </Grid>
              <Grid item xs={12}>
              <FormControl component="fieldset" className="formControl">
                <InputLabel id="select-1-label">Select something</InputLabel>
                <Select
                    labelId="select-1-label"
                    id="select-1"
                    value={dropdown1}
                    label="Select something"
                    onChange={handleChangeDropdown1}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button className="btn btn--primary" variant="contained" 
                    onClick={() => handleSubmit({dropdown1, value1, radio1} as InputParams)}>
                    Submit
                </Button>
              </Grid>
            </Grid>
    );
  }