'use server';

import { revalidatePath } from 'next/cache';
import { ZodError } from 'zod';

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

export const getAllNotes = async (): Promise<ActionResponse<NoteModel[]>> => {
  try {
    const userSession = await getUserSession();

    if (!userSession) {
      return { status: StatusCode.UNAUTHORIZED, error: 'Unauthorized' };
    }

    const notes: NoteModel[] = await prisma.note.findMany({
      where: { author_id: userSession.id as number },
    });

    if (!notes) {
      return { status: StatusCode.NOT_FOUND, error: 'Notes not found' };
    }

    return { status: StatusCode.SUCCESS, data: notes };
  } catch (error) {
    logErrorMessage(error, 'fetching notes in getAllNotes 😿');
    return { status: StatusCode.INTERNAL_SERVER_ERROR, error };
  }
};

export const getSingleNote = async (
  noteId: string,
): Promise<ActionResponse<NoteModel>> => {
  try {
    const userSession = await getUserSession();

    if (!userSession) {
      return { status: StatusCode.UNAUTHORIZED, error: 'Unauthorized' };
    }

    const note = await prisma.note.findUnique({
      where: { id: Number(noteId) },
    });

    if (!note) {
      return { status: StatusCode.NOT_FOUND, error: 'Note not found' };
    }

    return { status: StatusCode.SUCCESS, data: note };
  } catch (error) {
    logErrorMessage(error, 'fetching note in getSingleNote 😿');
    return { status: StatusCode.INTERNAL_SERVER_ERROR, error };
  }
};

export const createNote = async (
  formData: FormData,
): Promise<ActionResponse> => {
  const creatFormvalues = Object.fromEntries(formData.entries());

  try {
    // Validate formData with zod schema
    const parsedData = createAndEditNoteValidationSchema.parse(creatFormvalues);

    const createNoteData: NoteCreate = {
      title: parsedData.title,
      priority: Number(parsedData.priority),
      content: parsedData.content,
    };

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

    if (error instanceof ZodError) {
      return {
        status: StatusCode.BAD_REQUEST,
        error: 'Please complete all required fields ☝🏾',
      };
    }

    return { status: StatusCode.INTERNAL_SERVER_ERROR, error };
  }
};

export const editNote = async (
  id: NoteModel['id'],
  complete: NoteModel['complete'],
  formData: FormData,
): Promise<ActionResponse> => {
  // Extract and convert formData to object
  const editFormvalues = Object.fromEntries(formData.entries());

  try {
    // Validate formData with zod schema
    const parsedData = createAndEditNoteValidationSchema.parse(editFormvalues);

    const editNoteData: NoteUpdate = {
      title: parsedData.title,
      priority: Number(parsedData.priority),
      content: parsedData.content,
      complete: complete,
    };

    const userSession = await getUserSession();

    if (!userSession) {
      return { status: StatusCode.UNAUTHORIZED, error: 'Unauthorized' };
    }

    await prisma.note.update({
      where: { id },
      data: editNoteData,
    });

    revalidatePath(`/notes/${id}`);
    return { status: StatusCode.SUCCESS };
  } catch (error) {
    logErrorMessage(error, 'editing note (server) 😿');

    if (error instanceof ZodError) {
      return {
        status: StatusCode.BAD_REQUEST,
        error: 'Please complete all required fields ☝🏾',
      };
    }

    return { status: StatusCode.INTERNAL_SERVER_ERROR, error };
  }
};

export const deleteNote = async (
  id: NoteModel['id'],
  isDetailPage?: boolean,
): Promise<ActionResponse> => {
  try {
    const userSession = await getUserSession();

    if (!userSession) {
      return { status: StatusCode.UNAUTHORIZED, error: 'Unauthorized' };
    }

    await prisma.note.delete({
      where: { id },
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
  id: NoteModel['id'],
  complete: NoteModel['complete'],
): Promise<ActionResponse> => {
  try {
    const userSession = await getUserSession();

    if (!userSession) {
      return { status: StatusCode.UNAUTHORIZED, error: 'Unauthorized' };
    }

    await prisma.note.update({
      where: { id },
      data: { complete: !complete },
    });

    return { status: StatusCode.SUCCESS };
  } catch (error) {
    logErrorMessage(error, `ticking off the note (server) 😿`);
    return { status: StatusCode.INTERNAL_SERVER_ERROR, error };
  }
};
