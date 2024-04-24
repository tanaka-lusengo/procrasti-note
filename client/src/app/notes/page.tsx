import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getAllNotes } from '@/server/actions/note-actions';
import { StatusCode } from '@/utils';

import { NotesContainer } from './components';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Notes page showing a list of all the notes available to you.',
};

const NotesPage = async () => {
  const { data, status } = await getAllNotes();

  if (status === StatusCode.UNAUTHORIZED) {
    redirect('/sign-in');
  } else if (!data) {
    return <NotesContainer notes={[]} />;
  } else if (status === StatusCode.SUCCESS) {
    return <NotesContainer notes={data} />;
  }
};

export default NotesPage;
