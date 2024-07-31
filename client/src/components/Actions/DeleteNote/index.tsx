'use client';

import { useRouter } from 'next/navigation';

import { deleteNote } from '@/server/actions/note-actions';
import { handleError, StatusCode } from '@/utils';

import * as Styled from './index.styled';
import { type FaIconSize } from './types';

interface DeleteNoteProps {
  id: number;
  isDetailPage?: boolean;
  iconSize?: FaIconSize;
}

const DeleteNote = ({ id, isDetailPage, iconSize }: DeleteNoteProps) => {
  const router = useRouter();

  const handleAction = async () => {
    try {
      const { status } = await deleteNote(id, isDetailPage);

      if (isDetailPage && status === StatusCode.SUCCESS) {
        router.push('/notes');
        router.refresh();
      }
    } catch (error) {
      handleError('deleting note 😿', error);
    }
  };

  return (
    <form action={async () => await handleAction()}>
      <Styled.IconButton type="submit" aria-label="Delete note">
        <span
          className={`fa-solid fa-trash-can ${iconSize}`}
          role="button"
        ></span>
      </Styled.IconButton>
    </form>
  );
};

export default DeleteNote;
