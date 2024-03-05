import { Metadata } from 'next';

import { getAllNotes } from '@/services/notesServices';
import { logErrorMessage } from '@/utils';

import { NotesContainer } from './components';

// Disableing caching and background regeneration to ensure that the content is always up-to-date
// with every user request due to the dynamic nature of this CRUD application.
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Notes page showing a list of all the notes available to you.',
};

const NotesPage = async () => {
  try {
    const notes = await getAllNotes();

    if (!notes) {
      throw new Error('Failed to fetch notes in NotesPage');
    }
    return <NotesContainer notes={notes} />;
  } catch (error) {
    logErrorMessage(error, 'Failed to fetch notes in NotesPage');
    return null;
  }
};

export default NotesPage;
