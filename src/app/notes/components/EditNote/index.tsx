'use client';

import { useRouter } from 'next/navigation';
import { RecordModel } from 'pocketbase';

import { NoteForm } from '@/components';
import { FormValues } from '@/components/NoteForm/types';
import { pb } from '@/lib';

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
    if (error instanceof Error) {
      console.error('Error Editing note 😿', error.message, error.cause);
    } else {
      console.error('Unknown error Editing note 😿', error);
    }
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
      onSubmit={(values, formik) => {
        handleEditNote(id as string, values);
        formik.resetForm();
        router.refresh();
        router.back();
      }}
      buttonLabel="Edit Note"
      showForm={showForm}
    />
  );
};

export default EditNote;
