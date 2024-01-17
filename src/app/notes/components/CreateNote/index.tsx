'use client';

import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { Button, NoteForm } from '@/components';
import { pb } from '@/lib';
import { logErrorMessage, toastConfig } from '@/utils';

import { CommonButtonsContainer } from '../common.styled';
import CreateAndEditFormFields from '../CreateAndEditFormFields';
import { initialValues } from '../CreateAndEditFormFields/initialValues';
import { FormValues } from '../CreateAndEditFormFields/types';
import { validationSchema } from '../CreateAndEditFormFields/validationSchema';

interface CreateNoteProps {
  id: string;
  showForm: boolean;
}

const handleCreateNote = async (
  id: string,
  values: FormValues = initialValues,
) => {
  try {
    const { title, category, content } = values || {};

    const newNoteData = {
      title,
      category,
      content,
      author: id,
    };

    await pb.collection('notes').create(newNoteData);
  } catch (error) {
    logErrorMessage(error, 'creating note 😿');
  }
};

const notifyError = () =>
  toast.error('There was an error creating a note 🥺', toastConfig);

const CreateNote = ({ id, showForm }: CreateNoteProps) => {
  const router = useRouter();

  return (
    <NoteForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, formik) => {
        try {
          handleCreateNote(id, values);
          formik.resetForm();
          router.refresh();
        } catch (error) {
          notifyError();
        } finally {
          router.back();
        }
      }}
      showForm={showForm}
    >
      <CreateAndEditFormFields />
      <CommonButtonsContainer>
        <Button type="submit">Add Note</Button>
        <Button onClick={router.back} type="button">
          Close
        </Button>
      </CommonButtonsContainer>

      <Toaster />
    </NoteForm>
  );
};

export default CreateNote;
