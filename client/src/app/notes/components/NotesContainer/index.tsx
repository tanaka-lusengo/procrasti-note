'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import boredWoman from '@/../public/images/laying-bored-woman.svg';
import { CreateNote } from '@/components/Actions';
import { ButtonLink, Stack, Typography } from '@/components/Design';
import { useUser } from '@/context/UserContext';
import { type Note as NoteModel } from '@/lib/openapi/generated';

import Note from '../Note';

import * as Styled from './index.styled';

const NotesContainer = ({ notes }: { notes: NoteModel[] }) => {
  // useSearchParams hook to get the query params from the URL to render the modal for a clean Stateless, Route-Based Approach ✌🏾
  const searchParams = useSearchParams()?.get('show-form');
  const showForm = Boolean(searchParams);

  const showNotes = notes && notes.length != 0;

  const notesCount = showNotes ? notes.length : '0 😢';

  const { user } = useUser();

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      gap="md"
      maxWidth={80}
      marginTop="lg"
      marginBottom="lg"
    >
      <Styled.TopContainer>
        <div>
          <Typography component="h1">
            Hey {user?.username ?? 'You'} <Styled.Wave>👋🏾</Styled.Wave>
          </Typography>
          <Typography>
            You currently have{' '}
            <Typography component="span" fontSize="h3" color="primary">
              <b>{notesCount}</b>
            </Typography>{' '}
            Notes
          </Typography>
        </div>

        <Image
          src={boredWoman}
          alt="A woman, lying down with her phone, procrastinating."
          height={180}
          style={{ width: 'auto' }}
          priority
        />
      </Styled.TopContainer>

      <ButtonLink href={'?show-form=true'}>New Note</ButtonLink>

      {showNotes ? (
        <Styled.List>
          {notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </Styled.List>
      ) : (
        <Typography fontSize="h5" textAlign="center">
          Oww... Looks like you have no notes yet 😞
        </Typography>
      )}

      {showForm ? <CreateNote /> : null}
    </Stack>
  );
};

export default NotesContainer;
