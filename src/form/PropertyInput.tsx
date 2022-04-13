import { Button, Grid } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import React from "react";
import { EPC, PremiseAge, PremisesInfo, Region } from "../data";
import { oneOfEnum } from "../util";

export type PropertyInputProps = {
    onSubmit: any,
}

export interface PropertyInputFormValues {
  region: Region,
  premisesInfo: PremisesInfo,
  epc: EPC,
}

const PropertyInputValidationSchema = 
  Yup.object().shape({
    region: Yup.string().required('Region is required'),
    premisesInfo: Yup.object().shape({
      numRooms: Yup.number()
        .min(1, 'Too few rooms')
        .max(10, 'Too many rooms')
        .required('Required'),
      floorArea: Yup.number()
        .min(1, 'Area seems too small for a valid estimate')
        .max(500, 'Area seems large. Use m2 not ft2. We are unable to estimate very large properties')
        .required('Required'),
      age: oneOfEnum(PremiseAge).required('Choose an age bracket'),
      type: Yup.string().required('Property type is required'),
    }),
    epc: Yup.object().shape({

    }),
});

export function PropertyInput(props: PropertyInputProps & PropertyInputFormValues) {
  const { onSubmit, premisesInfo, epc, region } = props;
  const initialValues: PropertyInputFormValues = { premisesInfo, epc, region } ;
  return (
    <Formik
    initialValues={{...initialValues}}
    validationSchema={PropertyInputValidationSchema}
    onSubmit={async (values) => {
        onSubmit(
          values as PropertyInputFormValues);
    }}
    >
    {({ errors, touched, values }) => {
      return (
        <Form >
          {JSON.stringify(values)}
        <Grid container spacing={2}>
          <Grid item xs={8}>
              <label
              htmlFor="type-label"
              >
              What region are you in?
              </label>
              {touched.region && errors.region && <div>{errors.region}</div>}
          </Grid>
          <Grid item xs={4}>
              <Field as="select" name="region">    
                  <option value={Region.Scotland}>Scotland</option>
                  <option value={Region.Wales}>Wales</option>
                  <option value={Region.NorthernEngland}>Northern England</option>
                  <option value={Region.Midlands}>Midlands</option>
                  <option value={Region.SouthernEngland}>Southern England</option>
              </Field>
          </Grid>
          <Grid item xs={8}>
              <label
              htmlFor="type-label"
              >
              What type of house is it?
              </label>
              {touched.premisesInfo && touched.premisesInfo!.type && errors.premisesInfo && errors.premisesInfo!.type && <div>{errors.premisesInfo!.type}</div>}
          </Grid>
          <Grid item xs={4}>
              <Field as="select" name="premisesInfo.type">       
                  <option value="EndTerraced">End-Terraced</option>
                  <option value="MidTerraced">Mid-Terraced</option>
                  <option value="SemiDetached">Semi-Detached</option>
                  <option value="Detached">Detached</option>
                  <option value="Bungalow">Bungalow</option>
                  <option value="Flat">Flat</option>
              </Field>
          </Grid>
          <Grid item xs={8}>
              <label
              htmlFor="age-label"
              >
              When was it built?
              </label>
              {touched.premisesInfo && touched.premisesInfo!.age && errors.premisesInfo && errors.premisesInfo!.age && <div>{errors.premisesInfo!.age}</div>}
          </Grid>
          <Grid item xs={4}>
              <Field as="select" name="premisesInfo.age"> 
              <option value="Pre 1900">Pre 1900</option>
              <option value="1900-1950" >1900-1950</option>
              <option value="1950-1975">1950-1975</option>
              <option value="1976-1990">1976-1990</option>
              <option value="Post 1990">Post 1990</option>
              </Field>
          </Grid>
          <Grid item xs={8}>
              <label
              htmlFor="num-rooms-label"
              >
              How many bedrooms and living rooms?
              </label>
              {touched.premisesInfo && touched.premisesInfo!.numRooms && errors.premisesInfo && errors.premisesInfo!.numRooms && <div>{errors.premisesInfo!.numRooms}</div>}
          </Grid>
          <Grid item xs={4}>
              <Field type="number" name="premisesInfo.numRooms" />
          </Grid>
          <Grid item xs={8}>
              <label
              htmlFor="floor-area-label"
              >
              Floor area (approx)
              </label>
              {touched.premisesInfo && touched.premisesInfo!.floorArea && errors.premisesInfo && errors.premisesInfo!.floorArea && <div>{errors.premisesInfo!.floorArea}</div>}
          </Grid>
          <Grid item xs={4}>
              <Field name="premisesInfo.floorArea" />&nbsp;m<sup>2</sup>
          </Grid>
          <Grid item xs={12}>
            Building energy performance (from your EPC)
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="epc-label-wall">Wall</label>
          </Grid>
          <Grid item xs={6}>  
            <Field as="select" name="epc.energyPerformance.wall" >
              <option value={0}>--Please select--</option>
              <option value={1}>Very good</option>
              <option value={2}>Good</option>
              <option value={3}>Average</option>
              <option value={4}>Poor</option>
              <option value={5}>Very poor</option>
              <option value={6}>N/A</option>
            </Field>
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="epc-label-roof">Roof</label>
          </Grid>
          <Grid item xs={6}>  
            <Field as="select" name="epc.energyPerformance.roof" >
              <option value={0}>--Please select--</option>
              <option value={1}>Very good</option>
              <option value={2}>Good</option>
              <option value={3}>Average</option>
              <option value={4}>Poor</option>
              <option value={5}>Very poor</option>
              <option value={6}>N/A</option>
            </Field>
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="epc-label-roof">Window</label>
          </Grid>
          <Grid item xs={6}>  
            <Field as="select" name="epc.energyPerformance.window" >
              <option value={0}>--Please select--</option>
              <option value={1}>Very good</option>
              <option value={2}>Good</option>
              <option value={3}>Average</option>
              <option value={4}>Poor</option>
              <option value={5}>Very poor</option>
              <option value={6}>N/A</option>
            </Field>
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="epc-label-roof">Floor</label>
          </Grid>
          <Grid item xs={6}>  
            <Field as="select" name="epc.energyPerformance.floor" >
              <option value={0}>--Please select--</option>
              <option value={1}>Very good</option>
              <option value={2}>Good</option>
              <option value={3}>Average</option>
              <option value={4}>Poor</option>
              <option value={5}>Very poor</option>
              <option value={6}>N/A</option>
            </Field>
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="epc-label-roof">Main Heating</label>
          </Grid>
          <Grid item xs={6}>  
            <Field as="select" name="epc.energyPerformance.mainHeating" >
              <option value={0}>--Please select--</option>
              <option value={1}>Very good</option>
              <option value={2}>Good</option>
              <option value={3}>Average</option>
              <option value={4}>Poor</option>
              <option value={5}>Very poor</option>
              <option value={6}>N/A</option>
            </Field>
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="epc-label-roof">Hot Water</label>
          </Grid>
          <Grid item xs={6}>  
            <Field as="select" name="epc.energyPerformance.hotWater" >
              <option value={0}>--Please select--</option>
              <option value={1}>Very good</option>
              <option value={2}>Good</option>
              <option value={3}>Average</option>
              <option value={4}>Poor</option>
              <option value={5}>Very poor</option>
              <option value={6}>N/A</option>
            </Field>
          </Grid>
          <Grid item xs={12}>
          <Button variant="contained" color="primary"  type="submit">
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
