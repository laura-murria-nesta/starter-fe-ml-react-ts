import './App.css';
import React from "react";
import { useState } from "react";
import { Report } from './Report';
import { InputForm } from './form/InputForm';
import { InputParams, predict, Result } from './model';
import { Alert, Box, Grid, StyledEngineProvider } from '@mui/material';
import { InputWizard } from './form/InputWizard';

export default function App() {

  const [ result, setResult ] = useState(null as Result | null );
  const [ error, setError ] = useState(null as string | null);

  const handleSubmitInput = async (input: InputParams) => {
    try { 
      const result = await predict(input);
      setResult(result);
      setError(null);
    } catch (err) {
      const code = 'E1001';
      const mess = 'Unable to generate prediction';
      console.error(`${code}: ${mess}. ${err}`);
      setError(`${mess}. ${code}`);
    }
  };

  const reset = () => {
    setError(null);
    setResult(null);
  };
  

  return ( 
    <StyledEngineProvider injectFirst>
      <Box sx={{ border: 3, padding: 5, minHeight: 400 }} >
      {error ? <Alert severity="error">{error}</Alert> : null}
      This is my app
      {
      // If result is not yet known, this is the start - collect input 
      (!result)
        ?
          <Grid container spacing={2} flexWrap='wrap'>
            <Grid item xs={12} sm={6}>
              <Grid item xs={12}>
                <h1>My overall heading</h1>
                <h3>Tell us some information and we'll give you something back</h3>
              </Grid>
              <Grid item xs={12} >
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputWizard />
            </Grid>
          </Grid>
        : 
        <>
          {/* Once result is present show report */}
          { (result)
          ?
            <Report 
              result={result}
              reset={reset}
            />
          : <Alert severity="error">Could not generate result for this input</Alert>}
        </>
      }
    </Box>
    </StyledEngineProvider> 
  ); 
}







