import { getAllNotes, getSingleNote } from '@/services/notesServices';
import { logErrorMessage } from '@/utils';

import { NoteDetail } from './components';

export const revalidate = 0;

interface NoteDetailPageProps {
  params: { id: string };
}

// This function is used to generate the metadata for the note detail page
export async function generateMetadata({ params }: NoteDetailPageProps) {
  try {
    const note = await getSingleNote(params.id);
    if (!note) {
      throw new Error(
        `Failed to fetch note with id ${params.id} in generateMetadata`,
      );
    }
    const { title, id } = note;

    return {
      title: `${id}: ${title}`,
      description: "A single note's detail page.",
    };
  } catch (error) {
    logErrorMessage(error, 'Failed to fetch note in generateMetadata');
    return null;
  }
}

// This function is used to generate the static paths/params for the note detail page
export async function generateStaticParams() {
  try {
    const notes = await getAllNotes();

    return notes.map((note) => ({
      params: { id: note.id.toString() },
    }));
  } catch (error) {
    logErrorMessage(error, 'Failed to fetch notes in generateStaticParams');
    return [];
  }
}

// This function is used to generate the static data for the note detail page based on the params
const NoteDetailPage = async ({ params }: NoteDetailPageProps) => {
  try {
    const [note, notes] = await Promise.all([
      getSingleNote(params.id),
      getAllNotes(),
    ]);

    if (!note || !notes) {
      throw new Error(
        `Failed to fetch note with id ${params.id} or to get all notes in NoteDetailPage`,
      );
    }

    return <NoteDetail note={note} notes={notes} />;
  } catch (error) {
    logErrorMessage(error, 'Failed to fetch note or notes in NoteDetailPage');
    return null;
  }
};

export default NoteDetailPage;
