import formModel from './formModel';
const {
  formField: {
    firstName,
    lastName,
  }
} = formModel;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [firstName.name]: '',
  [lastName.name]: '',
};