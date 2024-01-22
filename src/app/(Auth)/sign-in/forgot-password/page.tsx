'use client';

import { Toaster } from 'react-hot-toast';
import { Field } from 'formik';
import * as yup from 'yup';

import { Button, NoteForm, Typography } from '@/components';
import * as StyledFormik from '@/components/ui/FormikUi';
import { usePocket } from '@/context/PocketbaseContext';

import * as Styled from './page.styled';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
});

const ForgotPasswordForm = () => {
  const { handleRequestPasswordReset } = usePocket();

  return (
    <NoteForm
      initialValues={{ email: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values, formik) => {
        await handleRequestPasswordReset(values);
        formik.resetForm();
      }}
    >
      <Styled.Container>
        <Typography tag="h2" textalign="center">
          Forgot Password?
        </Typography>

        <Typography tag="p" textalign="center">
          Don&apos;t worry. Resetting your password is easy as 🥧 <br />
          Just tell us the email address you registered with us and we will send
          you a link to reset your password 🤗
        </Typography>

        <Field
          label="Email"
          name="email"
          placeholder="example@gmail.com"
          component={StyledFormik.TextField}
        />

        <Styled.ButtonContainer>
          <Button $basefont type="submit">
            Send Link!
          </Button>
        </Styled.ButtonContainer>
      </Styled.Container>

      <Toaster />
    </NoteForm>
  );
};

export default ForgotPasswordForm;
