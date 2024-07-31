'use server';

import { revalidatePath } from 'next/cache';

import {
  type Note,
  type NoteCreate,
  type NoteUpdate,
} from '@/lib/openapi/generated';
import { createAndEditNoteValidationSchema } from '@/schemas';
import { API_URL, fetchWithErrors, logErrorMessage, StatusCode } from '@/utils';

import { getAccessToken } from './action-helpers';

export const getAllNotes = async () => {
  try {
    const accessToken = await getAccessToken();

    const notes: Note[] = await fetchWithErrors(`${API_URL}/api/notes`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { status: StatusCode.SUCCESS, data: notes };
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return { status: error.message, data: [] };
    }
    logErrorMessage(error, 'fetching notes in getAllNotes 😿');
    throw error;
  }
};

export const getSingleNote = async (noteId: string) => {
  try {
    const accessToken = await getAccessToken();

    const note: Note = await fetchWithErrors(`${API_URL}/api/note/${noteId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { status: StatusCode.SUCCESS, data: note };
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return { status: error.message, data: undefined };
    }
    logErrorMessage(error, 'fetching note in getSingleNote 😿');
    throw error;
  }
};

export const createNote = async (formData: FormData) => {
  const creatFormvalues = Object.fromEntries(formData.entries());

  // Validate formData with zod schema
  const parsedData = createAndEditNoteValidationSchema.parse(creatFormvalues);

  const createNoteData: NoteCreate = {
    title: parsedData.title,
    priority: Number(parsedData.priority),
    content: parsedData.content,
  };

  try {
    const accessToken = await getAccessToken();

    await fetchWithErrors(`${API_URL}/api/note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(createNoteData),
    });

    revalidatePath('/notes');
    return { status: StatusCode.SUCCESS };
  } catch (error) {
    logErrorMessage(error, 'creating note (server) 😿');
    throw error;
  }
};

export const editNote = async (
  id: Note['id'],
  complete: boolean,
  formData: FormData,
) => {
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
    const accessToken = await getAccessToken();

    await fetchWithErrors(`${API_URL}/api/note/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(editNoteData),
    });

    revalidatePath(`/notes/${id}`);
    return { status: StatusCode.SUCCESS };
  } catch (error) {
    logErrorMessage(error, 'editing note (server) 😿');
    throw error;
  }
};

export const deleteNote = async (id: Note['id'], isDetailPage?: boolean) => {
  try {
    const accessToken = await getAccessToken();

    await fetchWithErrors(`${API_URL}/api/note/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (isDetailPage) {
      return { status: StatusCode.SUCCESS };
    }

    revalidatePath('/notes');
    return { status: StatusCode.SUCCESS };
  } catch (error) {
    logErrorMessage(error, `deleting note (server) 😿`);
    throw error;
  }
};

export const toggleComplete = async (
  id: Note['id'],
  note: Note,
  complete: boolean,
) => {
  const editNoteData: NoteUpdate = {
    ...note,
    complete: !complete,
  };

  try {
    const accessToken = await getAccessToken();

    await fetchWithErrors(`${API_URL}/api/note/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(editNoteData),
    });

    return { status: StatusCode.SUCCESS };
  } catch (error) {
    logErrorMessage(error, `ticking off the note (server) 😿`);
    throw error;
  }
};
