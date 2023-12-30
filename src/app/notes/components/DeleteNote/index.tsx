'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from 'styled-components';

import { pb } from '@/lib';

import * as Styled from './index.styled';

type FaIconSize = 'fa-2xl' | 'fa-xl' | 'fa-lg' | 'fa-sm' | 'fa-xs' | 'fa-2xs';

interface DeleteNoteProps {
  id: string;
  isDetailPage?: boolean;
  iconSize?: FaIconSize;
}

const DeleteNote = ({ id, isDetailPage, iconSize }: DeleteNoteProps) => {
  const router = useRouter();
  const { colors } = useTheme();

  const handleDelete = async ({ id, isDetailPage }: DeleteNoteProps) => {
    try {
      await pb.collection('notes').delete(id);

      if (isDetailPage) {
        // To route away from deleted note
        router.push('/notes');
      } else {
        // To refresh notes list after deleting note
        router.refresh();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error Deleting note 😿', error.message, error.cause);
      } else {
        console.error('Unknown error Deleting note 😿', error);
      }
    }
  };

  return (
    <Styled.IconContainer onClick={() => handleDelete({ id, isDetailPage })}>
      <span
        className={`fa-solid fa-trash-can ${iconSize}`}
        about="Trash can icon"
        style={{ color: colors.error }}
      ></span>
    </Styled.IconContainer>
  );
};

export default DeleteNote;
