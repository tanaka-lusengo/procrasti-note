import * as z from 'zod';

import { type PriorityType, PriorityValue } from '@/app/notes/components/types';

export const createAndEditNoteValidationSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  priority: z
    .enum([
      PriorityValue.ONE,
      PriorityValue.TWO,
      PriorityValue.THREE,
      PriorityValue.FOUR,
      PriorityValue.FIVE,
    ] as const satisfies PriorityType[])
    .refine((value) => Object.values(PriorityValue).includes(value), {
      message: 'Priority must be a number between 1 and 5',
    }),
  content: z.string().min(1, { message: 'Content is required' }).max(100, {
    message: 'Content must be at most 100 characters',
  }),
});
