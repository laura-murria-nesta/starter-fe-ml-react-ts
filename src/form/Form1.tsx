import React from 'react';
import { Grid, Typography } from '@mui/material';
import { InputField, CheckboxField, SelectField } from './fields';

const cities = [
  {
    value: undefined,
    label: 'None'
  },
  {
    value: '1',
    label: 'New York'
  },
  {
    value: '2',
    label: 'Chicago'
  },
  {
    value: '3',
    label: 'Saigon'
  }
];


export default function Form1(props: any) {
  const {
    formField: {
      firstName,
      lastName,
    }
  } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Title 1
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField name={firstName.name} label={firstName.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={lastName.name} label={lastName.label} fullWidth />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}