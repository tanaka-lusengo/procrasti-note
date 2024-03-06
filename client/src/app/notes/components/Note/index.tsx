'use client';

import { DeleteNote, ToggleCompleteNote } from '@/app/notes/components';
import { Typography } from '@/components';
import { type Note as NoteModelType } from '@/lib/openapi/generated';

import * as Styled from './index.styled';

const Note = ({ note }: { note: NoteModelType }) => {
  const { id, title, priority } = note || {};

  return (
    <Styled.CardContainer>
      <ToggleCompleteNote note={note} />

      <Styled.CardContent href={`/notes/${id}`}>
        <Typography tag="h4">{title}</Typography>
        <Typography tag="h6">
          -Priority level: <b>{priority}</b>
        </Typography>
      </Styled.CardContent>

      <DeleteNote id={id} iconSize="fa-2xl" />
    </Styled.CardContainer>
  );
};

export default Note;
