'use client';

import { useState } from 'react';
import Image from 'next/image';

import completeChecked from '@/../public/images/circle-check-solid.svg';
import completeUnchecked from '@/../public/images/circle-regular.svg';
import { type Note } from '@/lib/openapi/generated';
import { handleToggleComplete } from '@/services/noteServices';

import * as Styled from './index.styled';

const ToggleCompleteNote = ({ note }: { note: Note }) => {
  const { id, complete } = note || {};

  const [isComplete, setIsComplete] = useState(complete);

  return (
    <Styled.CompleteButton
      $isComplete={isComplete}
      onClick={() => {
        handleToggleComplete(id, note, isComplete, setIsComplete);
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
