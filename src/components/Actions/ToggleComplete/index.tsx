'use client';

import { useOptimistic, useState } from 'react';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';

import completeChecked from '@/../public/images/circle-check-solid.svg';
import completeUnchecked from '@/../public/images/circle-regular.svg';
import { toggleComplete } from '@/server/actions/note-actions';
import { type NoteModel } from '@/types';
import { handleError, StatusCode, toastNotifyError } from '@/utils';

import * as Styled from './index.styled';

interface ToggleCompleteProps {
  note: NoteModel;
  isInNotes?: boolean;
}

const ToggleComplete = ({ note, isInNotes }: ToggleCompleteProps) => {
  const { id, complete } = note || {};
  const [isComplete, setIsComplete] = useState(complete);

  // useOptimistic hook to toggle the complete state of the note
  const [optimisticIsComplete, addOptimisticIsComplete] = useOptimistic(
    isComplete,
    (currentState: boolean) => !currentState,
  );

  const handleAction = async () => {
    // Toggle the optimistic state immediately
    addOptimisticIsComplete((prev: boolean) => prev);

    try {
      const { status, error } = await toggleComplete(id, optimisticIsComplete);

      if (status === StatusCode.UNAUTHORIZED) {
        toastNotifyError(`${error}`);
        // Revert optimistic update on unauthorized
        addOptimisticIsComplete((prev: boolean) => prev);
      } else {
        // Set the state based on optimistic update success
        setIsComplete(!optimisticIsComplete);
      }
    } catch (error) {
      // Revert optimistic update on failure
      addOptimisticIsComplete((prev: boolean) => prev);

      // Revalidate path depending on the context
      if (isInNotes) {
        revalidatePath('/notes');
      } else {
        revalidatePath(`/note/${id}`);
      }

      handleError('ticking off the note 😿', error);
    }
  };

  return (
    <form action={async () => await handleAction()}>
      <Styled.CompleteButton
        type="submit"
        aria-label="Toggle complete"
        $isComplete={optimisticIsComplete}
      >
        <Image
          src={optimisticIsComplete ? completeChecked : completeUnchecked}
          width={33}
          style={{ height: 'auto' }}
          priority
          alt={
            optimisticIsComplete
              ? 'A circle icon with a checkmark'
              : 'A circle icon without a checkmark'
          }
        />
      </Styled.CompleteButton>
    </form>
  );
};

export default ToggleComplete;
