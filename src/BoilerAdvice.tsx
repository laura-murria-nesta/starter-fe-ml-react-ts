import './App.css';
import React from "react";
import { useState } from "react";
import { Report } from './Report';
import { Alert, Box, Grid, StyledEngineProvider } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { InputParams, Result } from './model';
import ButtonBases from './form/BoilerControlSelect';

export default function App() {

  const [ result, setResult ] = useState(null as Result | null );
  const [ error, setError ] = useState(null as string | null);
  const [ inputParams, setInputParams ] = useState({} as InputParams);


  const reset = () => {
    setError(null);
    setResult(null);
  };

  return ( 
    <StyledEngineProvider injectFirst>
      <Box sx={{ border: 3, padding: 5, minHeight: 400 }} >
      {error ? <Alert severity="error">{error}</Alert> : null}
      Heading
      {
      // If result is not yet known, this is the start - collect input 
      (!result)
        ?
          <Grid container spacing={2} flexWrap='wrap'>
            <Grid item xs={12} sm={6}>
            <Formik
                initialValues={{...inputParams}}
                onSubmit={async (values) => {
                    setInputParams({
                        isCombiBoiler: values.isCombiBoiler,
                        isHWCylinder: values.isHWCylinder
                    } as InputParams);
                }}
                >
                {({ values }) => (
                    <Form>
                    <div id="combi-radio-group">Combi boiler?</div>
                    <div role="group" aria-labelledby="combi-radio-group">
                        <label>
                        <Field type="radio" name="isCombiBoiler" value={true}/>
                        Yes
                        </label>
                        <label>
                        <Field type="radio" name="isCombiBoiler" value={false} />
                        No
                        </label>
                    </div>
                    <div id="hwcylinder-radio-group">Hot water cylinder?</div>
                    <div role="group" aria-labelledby="hwcylinder-radio-group">
                        <label>
                        <Field type="radio" name="isHWCylinder" value={true}/>
                        Yes
                        </label>
                        <label>
                        <Field type="radio" name="isHWCylinder" value={false} />
                        No
                        </label>
                    </div>

                    <button type="submit">Submit</button>

                    <div>Combi boiler form: {values.isCombiBoiler}</div>
                    <div>Hot water cylinder form: {values.isHWCylinder}</div>

                    </Form>
                )} 
                </Formik>
                { inputParams ? 
                <>
                <div>Combi boiler state: {inputParams.isCombiBoiler}</div>
                <div>Hot water cylinder state: {inputParams.isHWCylinder}</div>
                </>
                : null }
            </Grid>
            <Grid>
                <ButtonBases />
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







