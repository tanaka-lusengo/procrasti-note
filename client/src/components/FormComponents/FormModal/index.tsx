'use client';

import { type FormHTMLAttributes } from 'react';

import * as Styled from './index.styled';

type FormProps = {
  action: FormHTMLAttributes<HTMLFormElement>['action'];
  children: React.ReactNode;
};

const FormModal = ({ action, children }: FormProps) => {
  return (
    <Styled.FormContainer>
      <Styled.FormContent>
        <form action={action}>{children}</form>
      </Styled.FormContent>
    </Styled.FormContainer>
  );
};

export default FormModal;
