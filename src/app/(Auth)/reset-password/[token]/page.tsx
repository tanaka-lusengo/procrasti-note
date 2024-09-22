'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type infer as ZodInfer } from 'zod';

import { Button, ButtonLink, Stack, Typography } from '@/components/Design';
import { FormModal, InputField } from '@/components/FormComponents';
import { resetPasswordValidationSchema } from '@/schemas';
import { resetPassword } from '@/server/actions/auth-actions';
import {
  handleError,
  StatusCode,
  toastNotifyError,
  toastNotifySuccess,
} from '@/utils';

type ResetPasswordForm = ZodInfer<typeof resetPasswordValidationSchema>;

const ResetPassword = ({ params }: { params: { token: string } }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const {
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordValidationSchema),
    mode: 'all',
  });

  const handleAction = async (formData: FormData) => {
    try {
      const { status, data, error } = await resetPassword(
        formData,
        params.token,
      );

      if (
        status === (StatusCode.BAD_REQUEST || StatusCode.INTERNAL_SERVER_ERROR)
      ) {
        toastNotifyError(`${error}`);
      }

      if (status === StatusCode.SUCCESS && data) {
        toastNotifySuccess(`Password reset Successfully! 🎉`);
        setUserName(data);
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
        {showSuccess ? 'Password Reset Success! 🎉' : 'Reset Password 🪄'}
      </Typography>

      {showSuccess ? (
        <>
          <Typography marginBottom="lg" textAlign="center">
            <b>{userName}</b>, you have successfully reset your password! Now
            click the button below to sign in with your new password 😎
          </Typography>

          <Stack justifyContent="center">
            <ButtonLink $basefont href={'/sign-in'}>
              Sign In
            </ButtonLink>
          </Stack>
        </>
      ) : (
        <>
          <Typography marginBottom="lg" textAlign="center">
            Enter your new password below to reset your password
          </Typography>

          <InputField
            label="New Password"
            name="newPassword"
            type="password"
            register={register}
            errors={errors}
          />

          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            register={register}
            errors={errors}
          />

          <Stack justifyContent="center">
            <Button $basefont type="submit" disabled={!isValid || isSubmitting}>
              Update!
            </Button>
          </Stack>
        </>
      )}
    </FormModal>
  );
};

export default ResetPassword;
