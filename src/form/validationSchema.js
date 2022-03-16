import * as Yup from 'yup';
import formModel from './formModel';
const {
  formField: {
    firstName,
    lastName,
  }
} = formModel;

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  Yup.object().shape({
    [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
  }),
];