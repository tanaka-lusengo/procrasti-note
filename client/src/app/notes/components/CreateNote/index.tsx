'use client';

import { useRouter } from 'next/navigation';

import { Button, NoteForm } from '@/components';
import { logErrorMessage } from '@/utils';

import { CommonButtonsContainer } from '../common.styled';
import CreateAndEditFormFields from '../CreateAndEditFormFields';
import { initialValues } from '../CreateAndEditFormFields/initialValues';
import { FormValues } from '../CreateAndEditFormFields/types';
import { validationSchema } from '../CreateAndEditFormFields/validationSchema';

interface CreateNoteProps {
  showForm: boolean;
}

const handleCreateNote = async (values: FormValues = initialValues) => {
  try {
    // TODO: This is a temporary console.log
    // eslint-disable-next-line no-console
    console.log('Handle create note', values);
  } catch (error) {
    logErrorMessage(error, 'creating note 😿');
  }
};

const CreateNote = ({ showForm }: CreateNoteProps) => {
  const router = useRouter();

  return (
    <NoteForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleCreateNote}
      showForm={showForm}
    >
      <CreateAndEditFormFields />

      <CommonButtonsContainer>
        <Button type="submit">Add Note</Button>
        <Button onClick={router.back} type="button">
          Close
        </Button>
      </CommonButtonsContainer>
    </NoteForm>
  );
};

export default CreateNote;
