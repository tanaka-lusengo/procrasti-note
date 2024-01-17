'use client';

import toast, { Toaster } from 'react-hot-toast';
import { Field } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

import { Button, NoteForm, Typography } from '@/components';
import * as StyledFormik from '@/components/ui/FormikUi';
import { usePocket } from '@/context/PocketbaseContext';
import { toastConfig } from '@/utils';

import * as Styled from './page.styled';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
});

const notifyError = () =>
  toast.error(
    'There was an error requesting a new password 😿, please try again!',
    toastConfig,
  );
const notifySuccess = () =>
  toast.success('Email sent successfully 🎉', toastConfig);

const ForgotPasswordForm = () => {
  const router = useRouter();
  const { handleRequestPasswordReset } = usePocket();

  return (
    <NoteForm
      initialValues={{ email: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values, formik) => {
        try {
          await handleRequestPasswordReset(values);
          formik.resetForm();
          notifySuccess();
        } catch (error) {
          notifyError();
        } finally {
          router.back();
        }
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
