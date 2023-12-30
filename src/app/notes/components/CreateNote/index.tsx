'use client';

import { useRouter } from 'next/navigation';

import { NoteForm } from '@/components';
import { initialValues } from '@/components/NoteForm/initialValues';
import { FormValues } from '@/components/NoteForm/types';
import { pb } from '@/lib';

const handleCreateNote = async (values: FormValues = initialValues) => {
  try {
    const { title, category, content } = values || {};

    const newNoteData = {
      title,
      category,
      content,
    };

    await pb.collection('notes').create(newNoteData);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating note 😿', error.message, error.cause);
    } else {
      console.error('Unknown error creating note 😿', error);
    }
  }
};

const CreateNote = ({ showForm }: { showForm: boolean }) => {
  const router = useRouter();

  return (
    <NoteForm
      onSubmit={(values, formik) => {
        handleCreateNote(values);
        formik.resetForm();
        router.refresh();
        router.back();
      }}
      buttonLabel="Add Note"
      showForm={showForm}
    />
  );
};

export default CreateNote;
