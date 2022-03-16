import * as React from 'react';
import {
  Formik,
  Form,
} from 'formik';
import { Button, CircularProgress, Step, StepLabel, Stepper } from '@mui/material';
import { useState } from 'react';
import formModel from './formModel';
import validationSchema from './validationSchema';
import { Report } from '../Report';
import formInitialValues from './formInitialValues';
import Form1 from './Form1';

const steps = ['Step 1', 'Step 2', 'Step 3'];
const { formId, formField } = formModel;

function _renderStepContent(step: any) {
	switch (step) {
			case 0:
			return <Form1 formField={formField} />;
			// case 1:
			// return <Form2 formField={formField} />;
			// case 2:
			// return <Form3 />;
			default:
			return <div>Not Found</div>;
	}
}

export const InputWizard: React.FC<{}> = () => {

	const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function _submitForm(values: any, actions: { setSubmitting: (arg0: boolean) => void; }) {
    await _sleep(1000);
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);

    setActiveStep(activeStep + 1);
  }

  function _handleSubmit(values: any, actions: { setTouched?: any; setSubmitting: any; }) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  return (
		<>
			<Stepper activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <>
        {activeStep === steps.length ? (
          <Report />
        ) : (
          <Formik
            initialValues={formInitialValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
                {_renderStepContent(activeStep)}

                <div>
                  {activeStep !== 0 && (
                    <Button onClick={_handleBack}>
                      Back
                    </Button>
                  )}
                  <div>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      {isLastStep ? 'Tell me' : 'Next'}
                    </Button>
                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                      />
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </>
    </>
  );
};