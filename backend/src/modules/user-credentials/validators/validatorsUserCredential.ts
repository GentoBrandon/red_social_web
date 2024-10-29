import { body, param } from 'express-validator';

const inputCreateUserCredential = () => {
  return [
    body('user_name')
      .notEmpty()
      .withMessage('the field is required')
      .isString()
      .withMessage('the field must be a string'),
    body('password')
      .notEmpty()
      .withMessage('the field is required')
      .isString()
      .withMessage('the field must be a string'),
    body('person_id')
      .notEmpty()
      .withMessage('the field is required')
      .isNumeric()
      .withMessage('the field must be a number'),
  ];
};
export default {
  inputCreateUserCredential,
};
