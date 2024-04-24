'use client';

import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button, Typography } from '@/components';
import { DeleteNote, EditNote, ToggleComplete } from '@/components/Actions';
import { type Note } from '@/lib/openapi/generated';
import { convertStringToHTML } from '@/utils';

import * as Styled from './index.styled';

interface NoteDetailProps {
  note: Note;
  notes: Note[];
}

const NoteDetail = ({ note, notes }: NoteDetailProps) => {
  const { id, title, priority, content } = note;

  const router = useRouter();

  // useSearchParams hook to get the query params from the URL to render the modal for a clean Stateless, Route-Based Approach ✌🏾
  const searchParams = useSearchParams()?.get('show-edit-form');
  const showForm = Boolean(searchParams);

  // Find the index of the current note
  const initialNoteIndex = notes.findIndex(
    (noteIndex) => noteIndex.id === note.id,
  );

  // Initialize state to keep track of current note index
  const [currentNoteIndex, setCurrentNoteIndex] = useState(initialNoteIndex);

  // Helper function to navigate to the prev or the next note
  const navigateToNote = useCallback(
    (direction: 'next' | 'prev') => {
      let newIndex;

      direction === 'next'
        ? (newIndex = (currentNoteIndex + 1) % notes.length)
        : (newIndex = (currentNoteIndex - 1 + notes.length) % notes.length);
      setCurrentNoteIndex(newIndex);
      router.push(`/notes/${notes[newIndex].id}`);
    },
    [currentNoteIndex, notes, router],
  );

  const handleGoBack = () => {
    router.push('/notes');
    router.refresh();
  };

  return (
    <>
      <Styled.NoteContainter>
        <Styled.TopContainer>
          <Styled.HiddenDiv />

          <Typography tag="h1" fontSize="h3" textalign="center">
            {title}
          </Typography>

          <ToggleComplete note={note} />
        </Styled.TopContainer>

        <Styled.MiddleContainter>
          <Styled.IconButton
            $left
            aria-label="Chevron pointing left"
            onClick={() => navigateToNote('prev')}
          >
            <span
              className="fa-solid fa-chevron-left fa-2xl"
              about="A chevron icon pointing left"
            ></span>
          </Styled.IconButton>

          <Styled.ContentContainter>
            <Typography fontSize="h5" textalign="center">
              ~ Priority Level:{' '}
              <Typography tag="span">
                <b>{priority}</b>
              </Typography>{' '}
              ~
            </Typography>
            <Typography fontSize="h5" textalign="center">
              <b>{convertStringToHTML(content)}</b>
            </Typography>
          </Styled.ContentContainter>

          <Styled.IconButton
            aria-label="Chevron pointing right"
            onClick={() => navigateToNote('next')}
          >
            <span
              className="fa-solid fa-chevron-right fa-2xl"
              about="A chevron icon pointing right"
            ></span>
          </Styled.IconButton>
        </Styled.MiddleContainter>

        <Styled.BottomContainer>
          <Link aria-label="Edit button icon" href={'?show-edit-form=true'}>
            <span
              className="fa-solid fa-pen-to-square fa-xl"
              about="Edit icon"
            ></span>
          </Link>
          <Button onClick={handleGoBack}>Go Back</Button>
          <DeleteNote id={id} isDetailPage iconSize="fa-xl" />
        </Styled.BottomContainer>
      </Styled.NoteContainter>

      {showForm ? <EditNote note={note} /> : null}
    </>
  );
};

export default NoteDetail;
