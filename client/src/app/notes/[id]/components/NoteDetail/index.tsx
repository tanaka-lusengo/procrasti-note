'use client';

import React, { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { DeleteNote, ToggleCompleteNote } from '@/app/notes/components';
import { Button, Typography } from '@/components';
import { type Notes } from '@/lib/openapi/generated';
import { convertStringToHTML } from '@/utils';

import * as Styled from './index.styled';

interface NoteDetailProps {
  note: Notes;
  notes: Notes[];
}

const NoteDetail = ({ note, notes }: NoteDetailProps) => {
  const { id, title, priority, content } = note;

  const router = useRouter();

  // useSearchParams hook to get the query params from the URL to render the modal for a clean Stateless, Route-Based Approach ✌🏾
  const searchParams = useSearchParams()?.get('show-edit-form');
  const showForm = Boolean(searchParams);

  // Dynamic import of the `EditNote` modal to render only when needed
  const EditNote = dynamic(() => import('../../../components/EditNote'), {
    ssr: false,
  });

  // Find the index of the current note
  const initialNoteIndex = useMemo(
    () => notes.findIndex((Arrnote) => Arrnote.id === note.id),
    [notes, note],
  );

  // Initialize state to keep track of current note index
  const [currentNoteIndex, setCurrentNoteIndex] = useState(initialNoteIndex);

  // Helper function to navigate to a prev or the next note
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

  const handleGoBack = useCallback(() => {
    router.push('/notes');
    router.refresh();
  }, [router]);

  return (
    <>
      <Styled.NoteContainter>
        <Styled.TopContainer>
          <Styled.HiddenDiv />

          <Typography tag="h3" textalign="center">
            {title}
          </Typography>

          <ToggleCompleteNote note={note} />
        </Styled.TopContainer>

        <Styled.MiddleContainter>
          <Styled.IconButton $left onClick={() => navigateToNote('prev')}>
            <span
              className="fa-solid fa-chevron-left fa-2xl"
              about="A chevron icon pointing left"
            ></span>
          </Styled.IconButton>

          <Styled.ContentContainter>
            <Typography tag="h6" textalign="center">
              ~ Priority Level: <b>{priority}</b> ~
            </Typography>
            <Typography tag="h5" textalign="center">
              {convertStringToHTML(content)}
            </Typography>
          </Styled.ContentContainter>

          <Styled.IconButton onClick={() => navigateToNote('next')}>
            <span
              className="fa-solid fa-chevron-right fa-2xl"
              about="A chevron icon pointing right"
            ></span>
          </Styled.IconButton>
        </Styled.MiddleContainter>

        <Styled.BottomContainer>
          <Link href={'?show-edit-form=true'}>
            <span
              className="fa-solid fa-pen-to-square fa-xl"
              about="Edit icon"
            ></span>
          </Link>
          <Button onClick={handleGoBack}>Go Back</Button>
          <DeleteNote id={id} isDetailPage iconSize="fa-xl" />
        </Styled.BottomContainer>
      </Styled.NoteContainter>

      {showForm ? <EditNote note={note} showForm={showForm} /> : null}
    </>
  );
};

export default React.memo(NoteDetail);
