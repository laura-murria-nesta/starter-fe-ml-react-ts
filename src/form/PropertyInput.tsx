import { Button } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { PremisesInfo } from "../data";

export type PropertyInputProps = {
    premisesInfo: PremisesInfo,
    onSubmit: any,
}


export function PropertyInput(props: PropertyInputProps) {
  const { onSubmit, premisesInfo } = props;

  return (
    <Formik
    initialValues={{...premisesInfo}}
    onSubmit={async (values) => {
        onSubmit(
          values as PremisesInfo);
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
