'use client';

import toast, { Toaster } from 'react-hot-toast';
import { Field } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button, NoteForm, Typography } from '@/components';
import * as StyledFormik from '@/components/ui/FormikUi';
import { usePocket } from '@/context/PocketbaseContext';
import { toastConfig } from '@/utils';

import * as Styled from './page.styled';
import { validationSchema } from './validationSchema';

const notifyError = () =>
  toast.error(
    'There was an error confirming your password 😿, please try again!',
    toastConfig,
  );
const notifySuccess = () =>
  toast.success('Your password has been changed successfully 🎉', toastConfig);

const ConfirmPasswordResetForm = () => {
  const router = useRouter();
  const token = useSearchParams().get('token');
  const { handleConfirmPasswordReset } = usePocket();

  return (
    <NoteForm
      initialValues={{ password: '', passwordConfirm: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values, formik) => {
        try {
          await handleConfirmPasswordReset(token as string, values);
          formik.resetForm();
          notifySuccess();
        } catch (error) {
          notifyError();
        } finally {
          router.push('/sign-in');
        }
      }}
    >
      <Styled.Container>
        <Typography tag="h2" textalign="center">
          Change your password
        </Typography>

        <Field
          label="New password"
          name="password"
          component={StyledFormik.PasswordField}
        />

        <Field
          label="Confirm password"
          name="passwordConfirm"
          component={StyledFormik.PasswordField}
        />

        <Styled.ButtonContainer>
          <Button $basefont type="submit">
            Change
          </Button>
        </Styled.ButtonContainer>
      </Styled.Container>

      <Toaster />
    </NoteForm>
  );
};

export default ConfirmPasswordResetForm;
