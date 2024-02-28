'use client';

import { useRouter } from 'next/navigation';
import { RecordModel } from 'pocketbase';

import { Button, NoteForm } from '@/components';
import { logErrorMessage } from '@/utils';

import { CommonButtonsContainer } from '../common.styled';
import CreateAndEditFormFields from '../CreateAndEditFormFields';
import { FormValues } from '../CreateAndEditFormFields/types';
import { validationSchema } from '../CreateAndEditFormFields/validationSchema';

interface EditNoteProps {
  note: Partial<RecordModel>;
  showForm: boolean;
}

const handleEditNote = async (id: string, values: FormValues) => {
  try {
    const { title, category, content } = values || {};

    const editNoteData = {
      title,
      category,
      content,
    };

    // TODO: This is a temporary console.log
    // eslint-disable-next-line no-console
    console.log('Handle edit note', id, editNoteData);
  } catch (error) {
    logErrorMessage(error, 'editing note 😿');
  }
};

const EditNote = ({ note, showForm }: EditNoteProps) => {
  const { id, title, category, content } = note || {};
  const initialValues: FormValues = {
    title,
    category,
    content,
  };
  const router = useRouter();

  return (
    <NoteForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleEditNote(id as string, values)}
      showForm={showForm}
    >
      <CreateAndEditFormFields />
      <CommonButtonsContainer>
        <Button type="submit">Edit Note</Button>
        <Button onClick={router.back} type="button">
          Close
        </Button>
      </CommonButtonsContainer>
    </NoteForm>
  );
};

export default EditNote;
