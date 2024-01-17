import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm new password is required'),
});
