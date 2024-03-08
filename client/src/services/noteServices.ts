import { SetStateAction } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import {
  type Note,
  type NoteCreate,
  type NoteUpdate,
} from '@/lib/openapi/generated';
import { notifyAndLogError } from '@/utils';
import { API_URL, fetchWithErrors } from '@/utils/api';

export const getAllNotes = async () => {
  try {
    const notes: Note[] = await fetchWithErrors(`${API_URL}/api/notes`);

    return notes;
  } catch (error) {
    notifyAndLogError(error, 'fetching all notes 😿');
    return [];
  }
};

export const getSingleNote = async (noteId: string) => {
  try {
    const note: Note = await fetchWithErrors(`${API_URL}/api/note/${noteId}`);

    return note;
  } catch (error) {
    notifyAndLogError(error, 'fetching note 😿');
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

    await fetchWithErrors(`${API_URL}/api/note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    });

    router.back();
    router.refresh();
  } catch (error) {
    notifyAndLogError(error, 'creating note 😿');
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

    await fetchWithErrors(`${API_URL}/api/note/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editNoteData),
    });

    router.back();
    router.refresh();
  } catch (error) {
    notifyAndLogError(error, 'editing note 😿');
  }
};

export const handleDelete = async (
  id: Note['id'],
  router: AppRouterInstance,
  isDetailPage?: boolean,
) => {
  try {
    await fetchWithErrors(`${API_URL}/api/note/${id}`, {
      method: 'DELETE',
    });

    if (isDetailPage) {
      router.push('/notes');
      router.refresh();
    }

    router.refresh();
  } catch (error) {
    notifyAndLogError(error, `deleting note 😿`);
  }
};

export const handleToggleComplete = async (
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

    await fetchWithErrors(`${API_URL}/api/note/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editNoteData),
    });

    setIsComplete(toggleComplete);
  } catch (error) {
    notifyAndLogError(error, `ticking off note 😿`);
  }
};
