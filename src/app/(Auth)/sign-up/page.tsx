'use client';

import { Toaster } from 'react-hot-toast';
import { Field } from 'formik';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Button, NoteForm } from '@/components';
import * as StyledFormik from '@/components/ui/FormikUi';
import { usePocket } from '@/context/PocketbaseContext';

import * as Styled from './page.styled';
import validationSchema from './validationSchema';

const SignUpForm = () => {
  const searchParams = useSearchParams()?.get('check-email');
  const showStandByModal = Boolean(searchParams);

  const StandByModal = dynamic(() => import('./components/StandbyModal'), {
    ssr: false,
  });

  const { signUpWithPassword } = usePocket();

  return (
    <NoteForm
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, formik) => {
        await signUpWithPassword(values);
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

      {showStandByModal ? <StandByModal /> : null}

      <Toaster />
    </NoteForm>
  );
};

export default SignUpForm;
