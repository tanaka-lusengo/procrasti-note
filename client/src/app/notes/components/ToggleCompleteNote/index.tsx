'use client';

import { useState } from 'react';
import Image from 'next/image';

import completeChecked from '@/../public/images/circle-check-solid.svg';
import completeUnchecked from '@/../public/images/circle-regular.svg';
import { type Notes } from '@/lib/openapi/generated';
import { handleIsCompleteClick } from '@/services/notesServices';

import * as Styled from './index.styled';

const ToggleCompleteNote = ({ note }: { note: Notes }) => {
  const { id, complete } = note || {};

  const [isComplete, setIsComplete] = useState(complete);

  return (
    <Styled.CompleteButton
      $isComplete={isComplete}
      onClick={() => {
        handleIsCompleteClick(id, note, isComplete, setIsComplete);
      }}
    >
      <Image
        src={isComplete ? completeChecked : completeUnchecked}
        width={33}
        height={33}
        alt={
          isComplete
            ? 'A circle icon with a checkmark'
            : 'A circle icon without a checkmark'
        }
      />
    </Styled.CompleteButton>
  );
};

export default ToggleCompleteNote;
