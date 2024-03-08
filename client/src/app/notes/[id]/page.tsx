import { getAllNotes, getSingleNote } from '@/services/noteServices';

import { NoteDetail } from './components';

export const revalidate = 0;

interface NoteDetailPageProps {
  params: { id: string };
}

// This function is used to generate the metadata for the note detail page
export async function generateMetadata({ params }: NoteDetailPageProps) {
  const note = await getSingleNote(params.id);

  if (!note) {
    return console.error('Failed to fetch note in generateMetadata');
  }
  const { title, id } = note;

  return {
    title: `${id}: ${title}`,
    description: "A single note's detail page.",
  };
}

// This function is used to generate the static paths/params for the note detail page
export async function generateStaticParams() {
  const notes = await getAllNotes();

  return notes.map((note) => ({
    params: { id: note.id.toString() },
  }));
}

// This function is used to generate the static data for the note detail page based on the params
const NoteDetailPage = async ({ params }: NoteDetailPageProps) => {
  const [note, notes] = await Promise.all([
    getSingleNote(params.id),
    getAllNotes(),
  ]);

  if (!note || !notes) {
    return console.error(
      `Failed to fetch note with id ${params.id} or to get all notes in NoteDetailPage`,
    );
  }

  return <NoteDetail note={note} notes={notes} />;
};

export default NoteDetailPage;
