import * as yup from 'yup';

import { Category, FormValues } from './types';

export const validationSchema: yup.ISchema<FormValues> = yup.object().shape({
  title: yup.string().required('A Title is required'),
  category: yup
    .string()
    .required('A Category is required')
    .oneOf(
      [Category.Productivity, Category.Personal],
      'Category must be either "productivity" or "personal"',
    ),
  content: yup.string().required('Descriptive content is required'),
});
