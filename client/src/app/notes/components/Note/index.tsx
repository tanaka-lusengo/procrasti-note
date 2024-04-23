'use client';

import { DeleteNote, ToggleCompleteNote } from '@/app/notes/components';
import { Typography } from '@/components';
import { type Note as NoteModel } from '@/lib/openapi/generated';

import * as Styled from './index.styled';

const Note = ({ note }: { note: NoteModel }) => {
  const { id, title, priority } = note;

  return (
    <Styled.CardContainer>
      <ToggleCompleteNote note={note} />

      <Styled.CardContent href={`/notes/${id}`}>
        <Typography fontSize="h4">{title}</Typography>
        <Typography>
          <i>
            -Priority level: <b>{priority}</b>
          </i>
        </Typography>
      </Styled.CardContent>

      <DeleteNote id={id} iconSize="fa-2xl" />
    </Styled.CardContainer>
  );
};

export default Note;
