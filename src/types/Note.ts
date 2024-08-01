import { Note } from '@prisma/client';

export type NoteModel = Note;

export type NoteCreate = Pick<Note, 'title' | 'content' | 'priority'>;

export type NoteUpdate = Pick<
  Note,
  'title' | 'content' | 'priority' | 'complete'
>;
