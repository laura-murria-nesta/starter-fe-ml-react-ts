import { Button, Grid } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { EPC, PremisesInfo } from "../data";

export type PropertyInputProps = {
    premisesInfo: PremisesInfo,
    epc: EPC,
    onSubmit: any,
}

export interface PropertyInputFormValues {
  premisesInfo: PremisesInfo,
  epc: EPC,
}

export function PropertyInput(props: PropertyInputProps) {
  const { onSubmit, premisesInfo, epc } = props;
  const initialValues: PropertyInputFormValues = { premisesInfo, epc } ;
  return (
    <Formik
    initialValues={{...initialValues}}
    onSubmit={async (values) => {
        onSubmit(
          values as PropertyInputFormValues);
    }}
    >
    {({ values }) => {
      return (
        <Form>
        <div className="mb-5">
            <label
            htmlFor="type-label"
            >
            What type of house is it?
            </label>
            <Field as="select" name="type">       
                <option value="Terrace">Terrace</option>
                <option value="Semi-Detached">Semi-Detached</option>
                <option value="Detached">Detached</option>
                <option value="Bungalow">Bungalow</option>
                <option value="Flat">Flat</option>
            </Field>
        </div>

        <div className="mb-5">
            <label
            htmlFor="age-label"
            >
            When was it built?
            </label>
            <Field as="select" name="age"> 
            <option value="Pre 1900">Pre 1900</option>
            <option value="1900-1950" >1900-1950</option>
            <option value="1950-1975">1950-1975</option>
            <option value="1976-1990">1976-1990</option>
            <option value="Post 1990">Post 1990</option>
            </Field>
        </div>

        <div className="mb-5">
            <label
            htmlFor="num-rooms-label"
            >
            How many bedrooms and living rooms are there in total?
            </label>
            <Field name="numRooms" />
        </div>

        <div className="mb-5">
            <label
            htmlFor="floor-area-label"
            >
            Floor area in sq m (approx)?
            </label>
            <Field name="floorArea" />
        </div>

        <div className="mb-5">
        <Grid container spacing={2}>
          <Grid item xs={8}>
          Building energy performance
          </Grid>
          <Grid item xs={4}>
            <label htmlFor="epc-label-wall">Wall</label>
          </Grid>
          <Grid item xs={4}>  
            <Field as="select" name="epc.energyperformance.wall" >
              <option value={1}>Very good (most efficient)</option>
              <option value={2}>Good</option>
              <option value={3}>Average</option>
              <option value={4}>Poor</option>
              <option value={5}>Very poor</option>
              <option value={0}>N/A</option>
            </Field>
          </Grid>
          <Grid item xs={4}>
            <label htmlFor="epc-label-roof">Roof</label>
          </Grid>
          <Grid item xs={4}>  
            <Field as="select" name="epc.energyperformance.roof" >
              <option value={1}>Very good (most efficient)</option>
              <option value={2}>Good</option>
              <option value={3}>Average</option>
              <option value={4}>Poor</option>
              <option value={5}>Very poor</option>
              <option value={0}>N/A</option>
            </Field>
          </Grid>


        </Grid>

            {/* wall: EPCEnergyPerfRating[],
    roof: EPCEnergyPerfRating[],
    window: EPCEnergyPerfRating[],
    floor: EPCEnergyPerfRating[],
    hotWater:  EPCEnergyPerfRating[],
    mainHeating: EPCEnergyPerfRating[],
    mainHeatingControl: EPCEnergyPerfRating[],
    secondaryHeating: EPCEnergyPerfRating[], */}
        </div>

        <Button
            onClick={() => onSubmit(premisesInfo)}
        >
            See my total
        </Button>
        </Form>
          );
        }}   
    </Formik>
  );
}
