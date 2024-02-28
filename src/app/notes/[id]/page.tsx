import { NoteDetail } from './components';

export const revalidate = 10;

const getNote = async (noteId: string) => {
  // TODO: This is a temporary console.log
  // eslint-disable-next-line no-console
  console.log('Handle get single note', noteId);
  return {};
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
  // TODO: This is a temporary console.log
  // eslint-disable-next-line no-console
  console.log('Handle get all notes here, to generate static paths');

  return [];
}
