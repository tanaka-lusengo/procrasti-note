'use client';

import toast, { Toaster } from 'react-hot-toast';
import { Field } from 'formik';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button, NoteForm } from '@/components';
import * as StyledFormik from '@/components/ui/FormikUi';
import { pb } from '@/lib';
import { logErrorMessage, toastConfig } from '@/utils';

import * as Styled from './page.styled';
import validationSchema from './validationSchema';

interface SignUpFormValues {
  email: string;
  password: string;
}

const handleSignUp = async (values: SignUpFormValues) => {
  try {
    const { email, password } = values || {};

    const userData = {
      email,
      password,
      passwordConfirm: password,
    };

    await pb.collection('users').create(userData);
    await pb.collection('users').requestVerification(email);
  } catch (error) {
    logErrorMessage(error, 'signing up 😿');
  }
};

const notifyError = () =>
  toast.error(
    'There was an error Signing up 🥺, please try again!',
    toastConfig,
  );
const notifySuccess = () =>
  toast.success('Sign up successful 🎉, now verify your email!', toastConfig);

const SignUpForm = () => {
  const router = useRouter();

  const searchParams = useSearchParams()?.get('check-email');
  const showStandByModal = Boolean(searchParams);

  const StandByModal = dynamic(() => import('./components/StandbyModal'), {
    ssr: false,
  });

  return (
    <NoteForm
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, formik) => {
        try {
          await handleSignUp(values);
          formik.resetForm();
          notifySuccess();
        } catch (error) {
          notifyError();
        } finally {
          router.push('?check-email=true');
        }
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

      {showStandByModal ? <StandByModal /> : null}

      <Toaster />
    </NoteForm>
  );
};

export default SignUpForm;
