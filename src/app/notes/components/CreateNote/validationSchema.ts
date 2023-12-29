import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  title: yup.string().required('A Title is required'),
  category: yup
    .string()
    .required('A Category is required')
    .oneOf(
      ['productivity', 'personal'],
      'Category must be either "productivity" or "personal"',
    ),
  content: yup.string().required('Descriptive content is required'),
});
