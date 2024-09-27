import React from 'react';

import { Typography } from '@/components/Design';
import { type NoteModel } from '@/types';

import Note from '../Note';

import { List } from './index.styled';

const NotesList = ({ notes }: { notes: NoteModel[] }) => {
  const showNotes = notes && notes.length != 0;

  return (
    <>
      {showNotes ? (
        <List>
          {notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </List>
      ) : (
        <Typography fontSize="h5" textAlign="center">
          Oww... Looks like you have no notes yet 😞
        </Typography>
      )}
    </>
  );
};

export default NotesList;
