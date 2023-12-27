'use client';

import { RecordModel } from 'pocketbase';
import { useTheme } from 'styled-components';

import { Typography } from '@/components';

import * as Styled from './index.styled';

interface NoteProps {
  note: Partial<RecordModel>;
}

const Note = ({ note }: NoteProps) => {
  const { id, title, category } = note || {};
  const { colors } = useTheme();

  return (
    <Styled.CardContainer>
      <Styled.CardContent href={`/notes/${id}`}>
        <span
          className="fa-solid fa-seedling"
          about="Seedling icon"
          style={{ color: colors.primary }}
        ></span>

        <div>
          <Typography tag="h5">{title}</Typography>
          <Typography tag="h6">- {category}</Typography>
        </div>
      </Styled.CardContent>
    </Styled.CardContainer>
  );
};

export default Note;
