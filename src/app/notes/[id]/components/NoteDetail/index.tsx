'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { RecordModel } from 'pocketbase';
import { useTheme } from 'styled-components';

import { ButtonLink, Typography } from '@/components';
import { convertStringToHTML, formatDateRelative } from '@/utils';

import DeleteNote from '../../../components/DeleteNote';

import * as Styled from './index.styled';

const NoteDetail = ({ note }: Partial<RecordModel>) => {
  const { id, title, category, content, updated, created } = note || {};
  const today = new Date().toISOString();

  const { colors } = useTheme();

  // useSearchParams hook to get the query params from the URL to render the modal for a clean Stateless, Route-Based Approach ✌🏾
  const searchParams = useSearchParams()?.get('show-edit-form');
  const showForm = Boolean(searchParams);

  // Dynamic import of the `EditNote` modal to render only when needed
  const EditNote = dynamic(() => import('../../../components/EditNote'), {
    ssr: false,
  });

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

        <Styled.BottomContainer>
          <Link href={'?show-edit-form=true'}>
            <span
              className="fa-solid fa-pen-to-square fa-xl"
              about="Edit icon"
              style={{ color: colors.error }}
            ></span>
          </Link>
          <ButtonLink href={'/notes'}>Go Back</ButtonLink>
          <DeleteNote id={id as string} isDetailPage iconSize="fa-xl" />
        </Styled.BottomContainer>
      </Styled.Containter>

      <Typography tag="p" textalign="center">
        <b>Created:</b> {formatDateRelative(created ? created : today)}
      </Typography>

      {showForm ? <EditNote note={note} showForm={showForm} /> : null}
    </>
  );
};

export default NoteDetail;
