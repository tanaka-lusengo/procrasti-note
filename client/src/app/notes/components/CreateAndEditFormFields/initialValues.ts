import type { NoteCreate } from '@/lib/openapi/generated';

export const initialValues: NoteCreate = {
  title: '',
  priority: 1,
  content: '',
};
