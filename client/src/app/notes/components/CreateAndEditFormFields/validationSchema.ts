import { number, object, string } from 'yup';

import { PriorityType, PriorityValue } from './types';

export const validationSchema = object({
  title: string().required('A Title is required'),
  priority: number()
    .oneOf(
      [
        PriorityValue.ONE,
        PriorityValue.TWO,
        PriorityValue.THREE,
        PriorityValue.FOUR,
        PriorityValue.FIVE,
      ] satisfies PriorityType[],
      'Priority must be a number between 1 and 5"',
    )
    .required('A priority level is required'),
  content: string().required('Descriptive content is required'),
});
