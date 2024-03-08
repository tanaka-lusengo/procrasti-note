'use client';

import { useRouter } from 'next/navigation';

import { handleDelete } from '@/services/noteServices';

import * as Styled from './index.styled';
import { FaIconSize } from './types';

interface DeleteNoteProps {
  id: number;
  isDetailPage?: boolean;
  iconSize?: FaIconSize;
}

const DeleteNote = ({ id, isDetailPage, iconSize }: DeleteNoteProps) => {
  const router = useRouter();

  return (
    <Styled.IconButton onClick={() => handleDelete(id, router, isDetailPage)}>
      <span
        className={`fa-solid fa-trash-can ${iconSize}`}
        about="Trash can icon"
      ></span>
    </Styled.IconButton>
  );
};

export default DeleteNote;
