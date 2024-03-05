'use client';

import { Toaster } from 'react-hot-toast';
import { Field } from 'formik';
import Link from 'next/link';

import { Button, NoteForm } from '@/components';
import * as StyledFormik from '@/components/FormikUi';

import * as Styled from './page.styled';
import validationSchema from './validationSchema';

const SignUpForm = () => {
  return (
    <NoteForm
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, formik) => {
        // TODO: This is a temporary console.log
        // eslint-disable-next-line no-console
        console.log('Handle sign-up', values);
        formik.resetForm();
      }}
    >
      <Styled.Title>Sign up</Styled.Title>

      <Field
        label="Email"
        name="email"
        placeholder="example@gmail.com"
        component={StyledFormik.TextField}
      />

      <Field
        label="Passowrd"
        name="password"
        component={StyledFormik.PasswordField}
      />

      <Styled.LowerButtonContainer>
        <Button $basefont type="submit">
          Sign up!
        </Button>

        <Link href={'/'} type="link">
          Close
        </Link>
      </Styled.LowerButtonContainer>

      <Toaster />
    </NoteForm>
  );
};

export default SignUpForm;
