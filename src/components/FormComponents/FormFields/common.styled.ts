'use client';

import styled from 'styled-components';

export const ErrorText = styled.p`
  margin-top: 0.2rem;
  color: ${({ theme }) => theme.colors.error};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  width: 100%;
  max-width: 50rem;
  margin: 0 auto;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.body1}rem;
`;

export const InputField = styled.input`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 1rem;
`;

export const SelectField = styled.select`
  cursor: pointer;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 1rem;
`;

export const TextareaField = styled.textarea`
  padding: 0.5rem 0.5rem 5rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 1rem;
`;
