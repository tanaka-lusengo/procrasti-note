'use client';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from 'styled-components';

import { Typography } from '@/components';

import * as Styled from './index.styled';

type Category = 'personal' | 'productivity';

interface NoteProps {
  title: string;
  category: Category;
}

const Note = ({ title, category }: NoteProps) => {
  const { colors } = useTheme();

  return (
    <Styled.ListCard>
      <FontAwesomeIcon icon={faSeedling} style={{ color: colors.primary }} />
      <div>
        <Typography tag="h5">{title}</Typography>
        <Typography tag="h6">- {category}</Typography>
      </div>
    </Styled.ListCard>
  );
};

export default Note;
