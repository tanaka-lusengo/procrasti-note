import { SetStateAction } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import {
  type Notes,
  type NotesCreate,
  type NotesUpdate,
} from '@/lib/openapi/generated';
import { logErrorMessage, toastNotifyError } from '@/utils';
import { API_URL } from '@/utils/api';

export const getAllNotes = async () => {
  try {
    const notes: Notes[] = await fetch(`${API_URL}/api/notes`).then((res) =>
      res.json(),
    );

    return notes;
  } catch (error) {
    logErrorMessage(error, 'Failed to fetch notes');
    return [];
  }
};

export const getSingleNote = async (noteId: string) => {
  try {
    const note: Notes = await fetch(`${API_URL}/api/notes/${noteId}`).then(
      (res) => res.json(),
    );

    return note;
  } catch (error) {
    logErrorMessage(error, 'Failed to fetch note in getSingleNote');
  }
};

export const handleCreateNote = async (
  values: NotesCreate,
  router: AppRouterInstance,
) => {
  try {
    const { content, priority, title } = values || {};

    const newNote: NotesCreate = {
      title,
      content,
      priority,
    };

    await fetch(`${API_URL}/api/notes`, {
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
  id: Notes['id'],
  values: NotesUpdate,
  router: AppRouterInstance,
) => {
  try {
    const { title, priority, content, complete } = values || {};

    const editNoteData: NotesUpdate = {
      title,
      priority,
      content,
      complete,
    };

    await fetch(`${API_URL}/api/notes/${id}`, {
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
  id: Notes['id'],
  router: AppRouterInstance,
  isDetailPage?: boolean,
) => {
  try {
    await fetch(`${API_URL}/api/notes/${id}`, {
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
  id: Notes['id'],
  note: Notes,
  isComplete: boolean,
  setIsComplete: (value: SetStateAction<boolean>) => void,
) => {
  const toggleComplete = !isComplete;

  try {
    const editNoteData: NotesUpdate = {
      ...note,
      complete: toggleComplete,
    };

    await fetch(`${API_URL}/api/notes/${id}`, {
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
