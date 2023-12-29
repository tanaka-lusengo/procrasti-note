'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { RecordModel } from 'pocketbase';

import boredWoman from '@/../public/images/laying-bored-woman.svg';
import { ButtonLink, Typography } from '@/components';

import Note from '../Note';

import * as Styled from './index.styled';

interface NotesContainerProps {
  notes: RecordModel[];
}

const NotesContainer = ({ notes }: NotesContainerProps) => {
  // useSearchParams hook to get the query params from the URL to render the modal for a clean Stateless, Route-Based Approach ✌🏾
  const searchParams = useSearchParams();
  const showForm = searchParams.get('show-form');

  // Dynamic import of the `CreateNote` modal component to render it only when needed
  const CreateNote = dynamic(() => import('../CreateNote'), {
    ssr: false,
  });

  const renderNotesCondition = notes && notes.length != 0;

  const notesCount = renderNotesCondition ? notes.length : '0 😢';

  console.log('notes', notes);

  return (
    <Styled.Container>
      <Styled.TopContainer>
        <div>
          <Typography tag="h1">
            Hey You <Styled.Wave>👋🏾</Styled.Wave>
          </Typography>
          <Typography tag="p">
            You currently have <Styled.Number>{notesCount}</Styled.Number> Notes
          </Typography>
        </div>

        <Image
          src={boredWoman}
          alt="Woamn laying down bored on her phone"
          height={180}
          priority
        />
      </Styled.TopContainer>

      <ButtonLink href={'?show-form=true'}>New Note</ButtonLink>

      {showForm ? <CreateNote showForm={showForm} /> : null}

      {renderNotesCondition ? (
        <Styled.List>
          {notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </Styled.List>
      ) : (
        <Typography tag="h5" textalign="center">
          Oww... Looks like you have no notes yet 😞
        </Typography>
      )}
    </Styled.Container>
  );
};

export default NotesContainer;
