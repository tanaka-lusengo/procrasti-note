import type { NotesCreate } from '@/lib/openapi/generated';

export const initialValues: NotesCreate = {
  title: '',
  priority: 1,
  content: '',
};
