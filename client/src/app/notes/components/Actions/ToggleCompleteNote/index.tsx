'use client';

import { useState } from 'react';
import Image from 'next/image';

import completeChecked from '@/../public/images/circle-check-solid.svg';
import completeUnchecked from '@/../public/images/circle-regular.svg';
import { toggleComplete } from '@/actions/note-actions';
import { type Note } from '@/lib/openapi/generated';
import { handleError, StatusCode } from '@/utils';

import * as Styled from './index.styled';

const ToggleCompleteNote = ({ note }: { note: Note }) => {
  const { id, complete } = note || {};

  const [isComplete, setIsComplete] = useState(complete);

  const handleAction = async () => {
    try {
      const { status } = await toggleComplete(id, note, complete);
      if (status === StatusCode.SUCCESS) setIsComplete(!isComplete);
    } catch (error) {
      handleError('ticking off the note 😿', error);
    }
  };

  return (
    <form action={async () => await handleAction()}>
      <Styled.CompleteButton
        type="submit"
        aria-label="Toggle complete"
        $isComplete={isComplete}
      >
        <Image
          src={isComplete ? completeChecked : completeUnchecked}
          width={33}
          style={{ height: 'auto' }}
          priority
          alt={
            isComplete
              ? 'A circle icon with a checkmark'
              : 'A circle icon without a checkmark'
          }
        />
      </Styled.CompleteButton>
    </form>
  );
};

export default ToggleCompleteNote;
