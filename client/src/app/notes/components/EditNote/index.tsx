'use client';

import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { Button, NoteForm } from '@/components';
import { type Notes, type NotesUpdate } from '@/lib/openapi/generated';
import { handleEditNote } from '@/services/notesServices';

import { CommonButtonsContainer } from '../common.styled';
import CreateAndEditFormFields from '../CreateAndEditFormFields';
import { validationSchema } from '../CreateAndEditFormFields/validationSchema';

interface EditNoteProps {
  note: Notes;
  showForm: boolean;
}

const EditNote = ({ note, showForm }: EditNoteProps) => {
  const { id, title, priority, content, complete } = note || {};

  const router = useRouter();

  const initialValues: NotesUpdate = {
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
