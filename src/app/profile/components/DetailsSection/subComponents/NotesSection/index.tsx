import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

import { NotesList } from '@/app/notes/components';
import { SuspenseLoader } from '@/components';
import { ButtonLink, Stack } from '@/components/Design';
import { type NoteModel } from '@/types';

const DynamicCreateNote = dynamic(
  () => import('@/components/Actions/CreateNote'),
  {
    loading: () => <SuspenseLoader />,
    ssr: false, // Lazy load on client side only
  },
);

export const NotesSection = ({ notes }: { notes: NoteModel[] }) => {
  const searchParams = useSearchParams()?.get('show-form');
  const showForm = Boolean(searchParams);

  return (
    <>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        marginTop="md"
      >
        <ButtonLink href={'?show-form=true'}>New Note</ButtonLink>

        <NotesList notes={notes} />
      </Stack>

      {showForm ? <DynamicCreateNote /> : null}
    </>
  );
};
