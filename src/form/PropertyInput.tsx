import { Button, Grid } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import React from "react";
import { EPC, EPCEnergyPerfRatings, PremiseAges, PremisesInfo, Regions } from "../data";

export type PropertyInputProps = {
    onSubmit: any,
}

export interface PropertyInputFormValues {
  region: string,
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
      age: Yup.string().test(
        'Age bracket required', 'Age bracket required', (value => value !== 'Not set')
      ),
      type: Yup.string().required('Property type is required'),
    }),
    epc: Yup.object().shape({
      energyPerformance: Yup.object().shape({
        wall: Yup.string().test(
          'Please select', 
          'Please select', 
          (value => parseInt(value!, 10) > 0)
        ),
        roof: Yup.string().test(
          'Please select', 
          'Please select', 
          (value => parseInt(value!, 10) > 0)
        ),
        window: Yup.string().test(
          'Please select', 
          'Please select', 
          (value => parseInt(value!, 10) > 0)
        ),
      }),
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
              {Regions.map(item => (
                <option key={`region-${item}`} value={item}>{item}</option>
              ))} 
              </Field>
          </Grid>
          <Grid item xs={8}>
              <label
              htmlFor="type-label"
              >
              What type of property is it?
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
              {PremiseAges.map(item => (
                <option key={`age-${item.key}`} value={item.key}>{item.label}</option>
              ))} 
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
            {EPCEnergyPerfRatings.map(item => (
              <option key={`wall-${item.value}`} value={item.value}>{item.label}</option>
            ))}
            </Field>
            {touched.epc && touched.epc!.energyPerformance && errors.epc && errors.epc!.energyPerformance && <div>{errors.epc!.energyPerformance.wall}</div>}
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="epc-label-roof">Roof</label>
          </Grid>
          <Grid item xs={6}>  
            <Field as="select" name="epc.energyPerformance.roof" >
            {EPCEnergyPerfRatings.map(item => (
              <option key={`roof-${item.value}`} value={item.value}>{item.label}</option>
            ))}
            </Field>
            {touched.epc && touched.epc!.energyPerformance && errors.epc && errors.epc!.energyPerformance && <div>{errors.epc!.energyPerformance.roof}</div>}
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="epc-label-window">Window</label>
            {touched.epc && touched.epc!.energyPerformance && errors.epc && errors.epc!.energyPerformance && <div>{errors.epc!.energyPerformance.window}</div>}
          </Grid>
          <Grid item xs={6}>  
            <Field as="select" name="epc.energyPerformance.window" >
              {EPCEnergyPerfRatings.map(item => (
                <option key={`window-${item.value}`} value={item.value}>{item.label}</option>
              ))}
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
