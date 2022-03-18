import { useState } from "react";
import { Report } from './Report';
import { Alert, Box, Grid, StyledEngineProvider } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { BoilerControls, InputParams, Result } from './model';

import './App.css';
import './form.css';

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
      Optimise your boiler
      {
      // If result is not yet known, this is the start - collect input 
      (!result)
        ?
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
                    <Grid container spacing={2} flexWrap='wrap'>
                        <Grid item xs={12} sm={6}>
                            <div id="combi-radio-group">Combi boiler?</div>
                            <div role="group" aria-labelledby="combi-radio-group" className="radio-toolbar">
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
                            <div role="group" aria-labelledby="hwcylinder-radio-group" className="radio-toolbar">
                                <label>
                                <Field type="radio" name="isHWCylinder" value={true}/>
                                Yes
                                </label>
                                <label>
                                <Field type="radio" name="isHWCylinder" value={false} />
                                No
                                </label>
                            </div>
                        </Grid>
                        <Grid>
                            <div id="controls-radio-group">What do your boiler controls look like?</div>
                            <div role="group" aria-labelledby="controls-radio-group" className="radio-toolbar"  >
                                <label>
                                <Field type="radio" name="boilerControls" value={BoilerControls.buttons}/>
                                 <img src='/images/boiler_buttons.png' alt={BoilerControls.buttons}></img>
                                </label>
                                <label>
                                <Field type="radio" name="boilerControls" value={BoilerControls.multipleDials}/>
                                 <img src='/images/multiple_dials.png' alt={BoilerControls.multipleDials}></img>
                                </label>
                                <label>
                                <Field type="radio" name="boilerControls" value={BoilerControls.oneDial}/>
                                 <img src='/images/one_dial.png' alt={BoilerControls.oneDial}></img>
                                </label>
                                <label>
                                <Field type="radio" name="boilerControls" value={BoilerControls.unknown}/>
                                 My controls look different
                                </label>
                                <label>
                                <Field type="radio" name="boilerControls" value={BoilerControls.inaccessible}/>
                                 I can't see my controls
                                </label>
                            </div>
                        </Grid>
                        <button type="submit">Submit</button>

                        <div>Combi boiler form: {values.isCombiBoiler}</div>
                        <div>Hot water cylinder form: {values.isHWCylinder}</div>
                        <div>Boiler controls form: {values.boilerControls}</div>
                    </Grid>
                    </Form>
                )} 
                </Formik>
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
      { inputParams ? 
                <>
                <div>Combi boiler state: {inputParams.isCombiBoiler}</div>
                <div>Hot water cylinder state: {inputParams.isHWCylinder}</div>
                <div>Boiler controls state: {inputParams.boilerControls}</div>
                </>
                : null }
    </StyledEngineProvider> 
  ); 
}







