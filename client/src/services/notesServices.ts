import { SetStateAction } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import {
  type Note,
  type NoteCreate,
  type NoteUpdate,
} from '@/lib/openapi/generated';
import { logErrorMessage, toastNotifyError } from '@/utils';
import { API_URL } from '@/utils/api';

export const getAllNotes = async () => {
  try {
    const notes: Note[] = await fetch(`${API_URL}/api/notes`).then((res) =>
      res.json(),
    );

    return notes;
  } catch (error) {
    logErrorMessage(error, 'Failed to fetch notes in getAllNotes');
    return [];
  }
};

export const getSingleNote = async (noteId: string) => {
  try {
    const note: Note = await fetch(`${API_URL}/api/note/${noteId}`).then(
      (res) => res.json(),
    );

    return note;
  } catch (error) {
    logErrorMessage(error, 'Failed to fetch note in getSingleNote');
  }
};

export const handleCreateNote = async (
  values: NoteCreate,
  router: AppRouterInstance,
) => {
  try {
    const { content, priority, title } = values || {};

    const newNote: NoteCreate = {
      title,
      content,
      priority,
    };

    await fetch(`${API_URL}/api/note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    });

    router.back();
  } catch (error) {
    toastNotifyError('creating note 😿');
    logErrorMessage(error, 'creating note 😿');
  } finally {
    router.refresh();
  }
};

export const handleEditNote = async (
  id: Note['id'],
  values: NoteUpdate,
  router: AppRouterInstance,
) => {
  try {
    const { title, priority, content, complete } = values || {};

    const editNoteData: NoteUpdate = {
      title,
      priority,
      content,
      complete,
    };

    await fetch(`${API_URL}/api/note/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editNoteData),
    });

    router.back();
  } catch (error) {
    toastNotifyError('editing note 😿');
    logErrorMessage(error, 'editing note 😿');
  } finally {
    router.refresh();
  }
};

export const handleDelete = async (
  id: Note['id'],
  router: AppRouterInstance,
  isDetailPage?: boolean,
) => {
  try {
    await fetch(`${API_URL}/api/note/${id}`, {
      method: 'DELETE',
    });

    if (isDetailPage) {
      router.push('/notes');
    }
  } catch (error) {
    logErrorMessage(error, 'deleting note 😿');
  } finally {
    router.refresh();
  }
};

export const handleIsCompleteClick = async (
  id: Note['id'],
  note: Note,
  isComplete: boolean,
  setIsComplete: (value: SetStateAction<boolean>) => void,
) => {
  const toggleComplete = !isComplete;

  try {
    const editNoteData: NoteUpdate = {
      ...note,
      complete: toggleComplete,
    };

    await fetch(`${API_URL}/api/note/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editNoteData),
    });

    setIsComplete(toggleComplete);
  } catch (error) {
    logErrorMessage(error, 'ticking off note 😿');
  }
};
