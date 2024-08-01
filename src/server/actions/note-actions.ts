'use server';

import type { Note } from '@prisma/client';
import { revalidatePath, unstable_cache as cache } from 'next/cache';

import { prisma } from '@/lib';
import { createAndEditNoteValidationSchema } from '@/schemas';
import type { NoteCreate, NoteModel, NoteUpdate } from '@/types';
import { logErrorMessage, StatusCode } from '@/utils';

import { getUserSession } from './helpers';

interface ActionResponse<T = any> {
  status: StatusCode;
  data?: T;
  error?: unknown | string;
}

export const getAllNotes = cache(
  async (): Promise<ActionResponse<NoteModel[]>> => {
    try {
      const userSession = await getUserSession();

      if (!userSession) {
        return { status: StatusCode.UNAUTHORIZED, error: 'Unauthorized' };
      }

      const notes: NoteModel[] = await prisma.note.findMany({
        where: {
          author_id: userSession.id as number,
        },
      });

      if (!notes) {
        return { status: StatusCode.NOT_FOUND, error: 'Notes not found' };
      }

      return { status: StatusCode.SUCCESS, data: notes };
    } catch (error) {
      logErrorMessage(error, 'fetching notes in getAllNotes 😿');
      return { status: StatusCode.INTERNAL_SERVER_ERROR, error };
    }
  },
);

export const getSingleNote = cache(
  async (noteId: string): Promise<ActionResponse<Note>> => {
    try {
      const userSession = await getUserSession();

      if (!userSession) {
        return { status: StatusCode.UNAUTHORIZED, error: 'Unauthorized' };
      }

      const note = await prisma.note.findUnique({
        where: {
          id: Number(noteId),
        },
      });

      if (!note) {
        return { status: StatusCode.NOT_FOUND, error: 'Note not found' };
      }

      return { status: StatusCode.SUCCESS, data: note };
    } catch (error) {
      logErrorMessage(error, 'fetching note in getSingleNote 😿');
      return { status: StatusCode.INTERNAL_SERVER_ERROR, error };
    }
  },
);

export const createNote = async (
  formData: FormData,
): Promise<ActionResponse> => {
  const creatFormvalues = Object.fromEntries(formData.entries());

  // Validate formData with zod schema
  const parsedData = createAndEditNoteValidationSchema.parse(creatFormvalues);

  const createNoteData: NoteCreate = {
    title: parsedData.title,
    priority: Number(parsedData.priority),
    content: parsedData.content,
  };

  try {
    const userSession = await getUserSession();

    if (!userSession) {
      return { status: StatusCode.UNAUTHORIZED, error: 'Unauthorized' };
    }

    await prisma.note.create({
      data: {
        ...createNoteData,
        author_id: userSession.id as number,
      },
    });

    revalidatePath('/notes');
    return { status: StatusCode.SUCCESS };
  } catch (error) {
    logErrorMessage(error, 'creating note (server) 😿');
    return { status: StatusCode.INTERNAL_SERVER_ERROR, error };
  }
};

export const editNote = async (
  id: Note['id'],
  complete: boolean,
  formData: FormData,
): Promise<ActionResponse> => {
  // Extract and convert formData to object
  const editFormvalues = Object.fromEntries(formData.entries());

  // Validate formData with zod schema
  const parsedData = createAndEditNoteValidationSchema.parse(editFormvalues);

  const editNoteData: NoteUpdate = {
    title: parsedData.title,
    priority: Number(parsedData.priority),
    content: parsedData.content,
    complete: complete,
  };

  try {
    const userSession = await getUserSession();

    if (!userSession) {
      return { status: StatusCode.UNAUTHORIZED, error: 'Unauthorized' };
    }

    await prisma.note.update({
      where: {
        id,
      },
      data: editNoteData,
    });

    revalidatePath(`/notes/${id}`);
    return { status: StatusCode.SUCCESS };
  } catch (error) {
    logErrorMessage(error, 'editing note (server) 😿');
    return { status: StatusCode.INTERNAL_SERVER_ERROR, error };
  }
};

export const deleteNote = async (
  id: Note['id'],
  isDetailPage?: boolean,
): Promise<ActionResponse> => {
  try {
    const userSession = await getUserSession();

    if (!userSession) {
      return { status: StatusCode.UNAUTHORIZED, error: 'Unauthorized' };
    }

    await prisma.note.delete({
      where: {
        id,
      },
    });

    if (isDetailPage) {
      return { status: StatusCode.SUCCESS };
    }

    revalidatePath('/notes');
    return { status: StatusCode.SUCCESS };
  } catch (error) {
    logErrorMessage(error, `deleting note (server) 😿`);
    return { status: StatusCode.INTERNAL_SERVER_ERROR, error };
  }
};

export const toggleComplete = async (
  id: Note['id'],
  note: Note,
  complete: boolean,
): Promise<ActionResponse> => {
  const editNoteData: NoteUpdate = {
    ...note,
    complete: !complete,
  };

  try {
    const userSession = await getUserSession();

    if (!userSession) {
      return { status: StatusCode.UNAUTHORIZED, error: 'Unauthorized' };
    }

    await prisma.note.update({
      where: {
        id,
      },
      data: editNoteData,
    });

    return { status: StatusCode.SUCCESS };
  } catch (error) {
    logErrorMessage(error, `ticking off the note (server) 😿`);
    return { status: StatusCode.INTERNAL_SERVER_ERROR, error };
  }
};
