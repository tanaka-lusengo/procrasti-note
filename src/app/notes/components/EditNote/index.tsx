'use client';

import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { RecordModel } from 'pocketbase';

import { Button, NoteForm } from '@/components';
import { pb } from '@/lib';
import { logErrorMessage, toastConfig } from '@/utils';

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

    await pb.collection('notes').update(id, editNoteData);
  } catch (error) {
    logErrorMessage(error, 'editing note 😿');
  }
};

const notifyError = () =>
  toast.error('There was an error editing a note 🥺', toastConfig);

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
      onSubmit={(values, formik) => {
        try {
          handleEditNote(id as string, values);
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
        <Button type="submit">Edit Note</Button>
        <Button onClick={router.back} type="button">
          Close
        </Button>
      </CommonButtonsContainer>

      <Toaster />
    </NoteForm>
  );
};

export default EditNote;
