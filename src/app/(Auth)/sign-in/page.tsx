'use client';

import { Toaster } from 'react-hot-toast';
import { Field } from 'formik';
import Link from 'next/link';
import { useTheme } from 'styled-components';

import { Button, NoteForm, Typography } from '@/components';
import * as StyledFormik from '@/components/ui/FormikUi';
import { usePocket } from '@/context/PocketbaseContext';
import { AuthProviders } from '@/context/types';

import * as Styled from './page.styled';
import validationSchema from './validationSchema';

const SignInForm = () => {
  const { colors } = useTheme();
  const { signInWithPassword, signInWithProvider } = usePocket();

  return (
    <NoteForm
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, formik) => {
        await signInWithPassword(values);
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
        <Link href={'/sign-in/forgot-password'}>
          <i>Forgot?</i>
        </Link>
      </Styled.UpperButtonContainer>

      <Styled.Text>~ or sign in with ~</Styled.Text>

      <Styled.SocialContainer>
        <Styled.Container>
          <Button
            $basefont
            onClick={() => signInWithProvider(AuthProviders.Google)}
            type="button"
          >
            <span
              className="fa-brands fa-google"
              about="Google icon"
              style={{ color: colors.secondary }}
            ></span>
          </Button>
          <Typography tag="p">Google</Typography>
        </Styled.Container>
        <Styled.Container>
          <Button
            $basefont
            onClick={() => signInWithProvider(AuthProviders.Github)}
            type="button"
          >
            <span
              className="fa-brands fa-github"
              about="Github icon"
              style={{ color: colors.secondary }}
            ></span>
          </Button>
          <Typography tag="p">Github</Typography>
        </Styled.Container>
      </Styled.SocialContainer>

      <Styled.LowerButtonContainer>
        <Link href={'/'}>Close</Link>
        <Link href={'/sign-up'}>Sign up</Link>
      </Styled.LowerButtonContainer>

      <Toaster />
    </NoteForm>
  );
};

export default SignInForm;
