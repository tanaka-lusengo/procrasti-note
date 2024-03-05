'use client';

import { Toaster } from 'react-hot-toast';
import { Field } from 'formik';
import Link from 'next/link';

import { Button, NoteForm, Typography } from '@/components';
import * as StyledFormik from '@/components/FormikUi';

import * as Styled from './page.styled';
import validationSchema from './validationSchema';

const SignInForm = () => {
  return (
    <NoteForm
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, formik) => {
        // TODO: This is a temporary console.log
        // eslint-disable-next-line no-console
        console.log('Handle sign-in', values);
        formik.resetForm();
      }}
    >
      <Styled.Title>Sign in</Styled.Title>

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

      <Styled.UpperButtonContainer>
        <Button $basefont type="submit">
          Sign in!
        </Button>
      </Styled.UpperButtonContainer>

      <Styled.Divider />

      <Typography tag="p" textalign="end">
        <i>Don&apos;t have an account?</i>
      </Typography>

      <Styled.LowerButtonContainer>
        <Link href={'/'}>Close</Link>
        <Link href={'/sign-up'}>Sign up</Link>
      </Styled.LowerButtonContainer>

      <Toaster />
    </NoteForm>
  );
};

export default SignInForm;
