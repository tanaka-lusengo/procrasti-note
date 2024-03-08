'use client';

import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { Button, NoteForm } from '@/components';
import { type Note, type NoteUpdate } from '@/lib/openapi/generated';
import { handleEditNote } from '@/services/noteServices';

import { CommonButtonsContainer } from '../common.styled';
import CreateAndEditFormFields from '../CreateAndEditFormFields';
import { validationSchema } from '../CreateAndEditFormFields/validationSchema';

interface EditNoteProps {
  note: Note;
  showForm: boolean;
}

const EditNote = ({ note, showForm }: EditNoteProps) => {
  const { id, title, priority, content, complete } = note || {};

  const router = useRouter();

  const initialValues: NoteUpdate = {
    title,
    priority,
    content,
    complete,
  };

  return (
    <>
      <NoteForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleEditNote(id, values, router)}
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

      <Toaster />
    </>
  );
};

export default EditNote;
