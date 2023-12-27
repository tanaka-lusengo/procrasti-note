'use client';

import Image from 'next/image';
import { RecordModel } from 'pocketbase';

import boredWoman from '@/../public/images/laying-bored-woman.svg';
import { Typography } from '@/components';

import Note from '../Note';

import * as Styled from './index.styled';

interface NotesContainerProps {
  notes: RecordModel[];
}

const NotesContainer = ({ notes }: NotesContainerProps) => (
  <Styled.Container>
    <Styled.TopContainer>
      <div>
        <Typography tag="h1">
          Hey You <Styled.Wave>👋🏾</Styled.Wave>
        </Typography>
        <Typography tag="p">
          You currently have{' '}
          <Styled.Number>{notes ? notes.length : '0 😢'}</Styled.Number> Notes
        </Typography>
      </div>

      <Image
        src={boredWoman}
        alt="Woamn laying down bored on her phone"
        height={180}
        priority
      />
    </Styled.TopContainer>

    {notes ? (
      <Styled.List>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </Styled.List>
    ) : (
      <>
        <Typography tag="h1">There are no notes yet 😞</Typography>
      </>
    )}
  </Styled.Container>
);

export default NotesContainer;
