'use client';

import { RecordModel } from 'pocketbase';

import { Typography } from '@/components';

import DeleteNote from '../DeleteNote';

import * as Styled from './index.styled';

interface NoteProps {
  note: Partial<RecordModel>;
}

const Note = ({ note }: NoteProps) => {
  const { id, title, category } = note || {};

  return (
    <Styled.CardContainer>
      <Styled.CardContent href={`/notes/${id}`}>
        <Typography tag="h4">{title}</Typography>
        <Typography tag="h6">- {category}</Typography>
      </Styled.CardContent>
      <DeleteNote id={id as string} />
    </Styled.CardContainer>
  );
};

export default Note;
