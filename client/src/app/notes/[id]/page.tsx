import { redirect } from 'next/navigation';

import { getAllNotes, getSingleNote } from '@/actions/note-actions';
import { StatusCode } from '@/utils';

import { NoteDetail } from './components';

interface NoteDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: NoteDetailPageProps) {
  const { data, status } = await getSingleNote(params.id);

  if (!data || status === StatusCode.UNAUTHORIZED) {
    console.error('Failed to fetch note and generate Metadata');
    return;
  }

  const { title, id } = data;

  return {
    title: `Note: ${id} - ${title}`,
    description: "A single note's detail page.",
  };
}

const NoteDetailPage = async ({ params }: NoteDetailPageProps) => {
  if (!params.id) {
    console.error('No id found in params');
    return;
  }

  const [singleNoteResponse, allNotesResponse] = await Promise.all([
    getSingleNote(params.id),
    getAllNotes(),
  ]);

  const { status: singleNoteStatus, data: singleNoteData } = singleNoteResponse;
  const { status: allNotesStatus, data: allNotesData } = allNotesResponse;

  if (!singleNoteData || !allNotesData) {
    console.error(
      `Failed to fetch note with id ${params.id} or to get all notes in NoteDetailPage`,
    );
    return;
  }

  if (
    singleNoteStatus === StatusCode.UNAUTHORIZED ||
    allNotesStatus === StatusCode.UNAUTHORIZED
  ) {
    redirect('/sign-in');
  }

  return <NoteDetail note={singleNoteData} notes={allNotesData} />;
};

export default NoteDetailPage;
