'use client';

import { RecordModel } from 'pocketbase';

import { ButtonLink, Typography } from '@/components';
import { convertStringToHTML, formatDateRelative } from '@/utils';

import * as Styled from './index.styled';

interface NoteDetailProps {
  note: Partial<RecordModel>;
}

const NoteDetail = ({ note }: NoteDetailProps) => {
  const { title, category, content, updated, created } = note || {};
  const today = new Date().toISOString();

  return (
    <>
      <Styled.Containter>
        <Typography tag="h1" textalign="center">
          {title}
        </Typography>
        <Typography tag="h6" textalign="center">
          <b>Updated</b> - {formatDateRelative(updated ? updated : today)}
        </Typography>
        <Styled.ContentContainter>
          <Typography tag="h6" textalign="center">
            ~ {category} ~
          </Typography>

          {convertStringToHTML(content)}
        </Styled.ContentContainter>

        <Styled.ButtonContainer>
          <ButtonLink href={'/notes'}>Go Back</ButtonLink>
        </Styled.ButtonContainer>
      </Styled.Containter>
      <Typography tag="p" textalign="center">
        <b>Created:</b> {formatDateRelative(created ? created : today)}
      </Typography>
    </>
  );
};

export default NoteDetail;
