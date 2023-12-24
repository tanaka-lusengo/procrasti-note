import { Metadata } from 'next';

import pb from '@/lib/pocketbase';

import { NotesContainer } from './components';

// exporting the Route Segment Config "revalidate = 0" will, essentially, disable caching and background regeneration,
// ensuring that the content is always fresh and up-to-date with every user request, which is necesary if not using fetch.
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Notes',
};

export const getNotes = async () => {
  const response = await pb
    .collection('notes')
    .getFullList({ sort: 'updated' });

  return response;
};

const NotesPage = async () => {
  const notes = await getNotes();

  return <NotesContainer notes={notes} />;
};

export default NotesPage;
