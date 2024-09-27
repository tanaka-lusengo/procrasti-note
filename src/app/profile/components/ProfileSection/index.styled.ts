import styled from 'styled-components';

import { theme } from '@/styles';

import { SectionContainer } from '../common.styled';

export const ProfileContainer = styled(SectionContainer)`
  flex-basis: 40%;
`;

export const ProfileImageContainer = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 150px;
  height: 150px;
  margin-top: -100px;

  border: 5px solid ${theme.colors.secondary};
  border-radius: 50%;
`;

export const BioContainer = styled.div`
  word-wrap: break-word;
  white-space: pre-wrap;
`;
