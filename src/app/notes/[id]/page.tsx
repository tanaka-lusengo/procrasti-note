import { pb } from '@/lib';

import { NoteDetail } from './components';

export const revalidate = 10;

const getNote = async (noteId: string) => {
  const response = await pb.collection('notes').getOne(noteId);
  return response;
};

interface NoteDetailPageProps {
  params: { id: string };
}

const NoteDetailPage = async ({ params }: NoteDetailPageProps) => {
  const note = await getNote(params.id);

  return <NoteDetail note={note} />;
};

export default NoteDetailPage;

export async function generateStaticParams() {
  const notes = await pb.collection('notes').getFullList({ sort: 'updated' });

  return notes.map(({ id }) => ({
    params: { id },
  }));
}
