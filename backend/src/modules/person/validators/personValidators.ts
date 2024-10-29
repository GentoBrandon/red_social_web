import {body} from 'express-validator'

  const input =()=>{

    return [
        body('first_name').notEmpty().withMessage('This field is required')
        .isString().withMessage('This field must be a string'),
        body('last_name').notEmpty().withMessage('This field is required')
        .isString().withMessage('This field must be a string'),
        body('birth_date').notEmpty().withMessage('This field is required')
        .isDate().withMessage('This field must be a date'),
        body('email').notEmpty().withMessage('This field is required')
        .isEmail().withMessage('This field must be an email')
    ]
     }
export default  {
    input
}