'use client';

import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { Button, NoteForm } from '@/components';
import { handleCreateNote } from '@/services/notesServices';

import { CommonButtonsContainer } from '../common.styled';
import CreateAndEditFormFields from '../CreateAndEditFormFields';
import { initialValues } from '../CreateAndEditFormFields/initialValues';
import { validationSchema } from '../CreateAndEditFormFields/validationSchema';

const CreateNote = ({ showForm }: { showForm: boolean }) => {
  const router = useRouter();

  return (
    <>
      <NoteForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleCreateNote(values, router)}
        showForm={showForm}
      >
        <CreateAndEditFormFields />

        <CommonButtonsContainer>
          <Button type="submit">Add Note</Button>
          <Button type="button" onClick={router.back}>
            Close
          </Button>
        </CommonButtonsContainer>
      </NoteForm>

      <Toaster />
    </>
  );
};

export default CreateNote;
