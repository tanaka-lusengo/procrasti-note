import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

import { SuspenseLoader } from '@/components';
import { getAllNotes } from '@/server/actions/note-actions';
import { StatusCode } from '@/utils';

const DynamicNotesContainer = dynamic(
  () => import('./components/NotesContainer'),
  { loading: () => <SuspenseLoader /> },
);

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Notes page showing a list of all the notes available to you.',
};

const NotesPage = async () => {
  const { data, status } = await getAllNotes();

  if (status === StatusCode.UNAUTHORIZED) {
    redirect('/sign-in');
  }

  if (!data || status !== StatusCode.SUCCESS) {
    return <DynamicNotesContainer notes={[]} />;
  }

  return <DynamicNotesContainer notes={data} />;
};

export default NotesPage;
