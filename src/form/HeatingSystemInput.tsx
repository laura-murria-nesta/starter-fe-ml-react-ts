import { Button, Grid } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { BoilerControls, ExistingHeatingInfo } from "../data";

export type HeatingSystemInputProps = {
    existingHeatingInfo: ExistingHeatingInfo,
    onSubmit: any,
}


export function HeatingSystemInput(props: HeatingSystemInputProps) {
  const { onSubmit, existingHeatingInfo } = props;

  return (
    <Formik
    initialValues={{...existingHeatingInfo}}
    onSubmit={async (values) => {
        onSubmit(
          values as ExistingHeatingInfo);
    }}
    >
    {({ values }) => {
      return (
        <Form>
        <Grid container spacing={2} flexWrap='wrap'>
            <Grid item xs={12} sm={6}>
            <div id="combi-radio-group">Gas boiler?</div>
                <div role="group" aria-labelledby="gas-radio-group" className="radio-toolbar">
                    <label htmlFor="isGasBoiler">
                    <Field type="radio" name="isGasBoiler" value="yes" />
                    Yes
                    </label>
                    <label>
                    <Field type="radio" name="isGasBoiler" value="no" />
                    No
                    </label>
                </div>
                {values.isGasBoiler && (
                <>
                    <div id="combi-radio-group">Combi boiler?</div><div role="group" aria-labelledby="combi-radio-group" className="radio-toolbar">
                              <label htmlFor="isCombiBoiler">
                                  <Field type="radio" name="isCombiBoiler" value="yes" />
                                  Yes
                              </label>
                              <label>
                                  <Field type="radio" name="isCombiBoiler" value="no" />
                                  No
                              </label>
                          </div>
                </>
                )}
                <div id="hwcylinder-radio-group">Hot water cylinder?</div>
                <div role="group" aria-labelledby="hwcylinder-radio-group" >
                    <label>
                    <Field type="radio" name="isHWCylinder" value="yes"/>
                    Yes
                    </label>
                    <label>
                    <Field type="radio" name="isHWCylinder" value="no" />
                    No
                    </label>
                </div>
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" 
                onClick={() => onSubmit(existingHeatingInfo)}
            >
                Submit
            </Button>
            </Grid>
        </Grid>
        </Form>
          );
        }}   
    </Formik>
  );
}
