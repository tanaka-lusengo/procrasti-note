'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { theme } from '@/styles';

export const ProfilePictureContainer = styled(Link)`
  cursor: pointer;

  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 35px;
  height: 35px;

  border: 2px solid transparent;
  border-radius: 50%;

  transition: 0.3s ease-in-out;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media screen and (max-width: ${theme.spacing.breakpoints.sm}px) {
    display: none;
  }
`;
