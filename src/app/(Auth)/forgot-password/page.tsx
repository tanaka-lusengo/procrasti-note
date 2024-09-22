'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type infer as ZodInfer } from 'zod';

import { Button, ButtonLink, Stack, Typography } from '@/components/Design';
import { FormModal, InputField } from '@/components/FormComponents';
import { forgotPasswordValidationSchema } from '@/schemas';
import { forgotPassword } from '@/server/actions/auth-actions';
import {
  handleError,
  StatusCode,
  toastNotifyError,
  toastNotifySuccess,
} from '@/utils';

type ForgotPasswordForm = ZodInfer<typeof forgotPasswordValidationSchema>;

const ForgotPassword = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const {
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordValidationSchema),
    mode: 'all',
  });

  const handleAction = async (formData: FormData) => {
    try {
      const { status, data, error } = await forgotPassword(formData);

      if (
        status ===
        (StatusCode.NOT_FOUND ||
          StatusCode.BAD_REQUEST ||
          StatusCode.INTERNAL_SERVER_ERROR)
      ) {
        toastNotifyError(`${error}`);
      }

      if (status === StatusCode.SUCCESS && data) {
        toastNotifySuccess(`Password reset requested Successfully! 🎉`);
        setUserEmail(data);
        setShowSuccess(true);
      }
    } catch (error) {
      handleError('requesting new password 😿', error);
    }
  };

  return (
    <FormModal
      action={async (formData: FormData) => await handleAction(formData)}
    >
      <Typography
        component="h1"
        fontSize="h4"
        marginTop="sm"
        marginBottom="lg"
        textAlign="center"
      >
        {showSuccess ? 'Success! 🎉' : 'Forgot Password? 😿'}
      </Typography>

      {showSuccess ? (
        <>
          <Typography marginBottom="lg" textAlign="center">
            That all went through! Please check your email for the reset
            password link sent to:
          </Typography>

          <Typography marginBottom="lg" textAlign="center">
            <b>{userEmail}</b>
          </Typography>

          <Typography fontSize="body2" textAlign="center">
            <i>
              Note - this link is valid for <b>1 hour only</b>
            </i>
          </Typography>
        </>
      ) : (
        <>
          <Typography marginBottom="lg" textAlign="center">
            That&apos;s okay, let&apos;s get you sorted! Enter your email and we
            will send you a link to reset your password.
          </Typography>

          <InputField
            label="Email"
            name="email"
            placeholder="Email address"
            register={register}
            errors={errors}
          />

          <Stack justifyContent="center">
            <Button $basefont type="submit" disabled={!isValid || isSubmitting}>
              Send!
            </Button>

            <ButtonLink $basefont href="/sign-in">
              Go Back
            </ButtonLink>
          </Stack>
        </>
      )}
    </FormModal>
  );
};

export default ForgotPassword;
