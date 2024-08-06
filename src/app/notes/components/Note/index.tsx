import { DeleteNote, ToggleComplete } from '@/components/Actions';
import { Typography } from '@/components/Design';
import { type NoteModel } from '@/types';

import * as Styled from './index.styled';

const Note = ({ note }: { note: NoteModel }) => {
  const { id, title, priority } = note;

  return (
    <Styled.CardContainer>
      <ToggleComplete note={note} isInNotes={true} />

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
