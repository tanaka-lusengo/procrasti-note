'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type infer as ZodInfer } from 'zod';

import { Button, Divider, Stack, Typography } from '@/components/Design';
import { FormModal, InputField } from '@/components/FormComponents';
import { useUser } from '@/context/UserContext';
import { signInValidationSchema } from '@/schemas';
import { signIn } from '@/server/actions/auth-actions';
import {
  handleError,
  StatusCode,
  toastNotifyError,
  toastNotifySuccess,
} from '@/utils';

type SignInForm = ZodInfer<typeof signInValidationSchema>;

const SignInForm = () => {
  const { setUser } = useUser();
  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInValidationSchema),
    mode: 'all',
  });

  const handleAction = async (formData: FormData) => {
    try {
      const { status, error, data } = await signIn(formData);

      if (status === StatusCode.NOT_FOUND) {
        toastNotifyError(`${error}`);
      }

      if (status === StatusCode.UNAUTHORIZED) {
        toastNotifyError(`${error}`);
      }

      if (status === StatusCode.SUCCESS) {
        setUser(data);
        toastNotifySuccess('Logged In Successfully 😸');
        router.push('/notes');
      }
    } catch (error) {
      handleError('logging in 😿', error);
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
        marginBottom="md"
        textAlign="center"
      >
        Sign in
      </Typography>

      <InputField
        label="Email"
        name="email"
        placeholder="example@gmail.com"
        register={register}
        errors={errors}
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        register={register}
        errors={errors}
      />

      <Stack alignItems="flex-start" justifyContent="space-between">
        <Button $basefont type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Sign in!'}
        </Button>
        <Link href={'/forgot-password'}>Forgot password?</Link>
      </Stack>

      <Divider />

      <Typography component="p" color="primary" textAlign="end">
        <i>Don&apos;t have an account?</i>
      </Typography>

      <Stack alignItems="center" justifyContent="space-between" marginTop="md">
        <Link href={'/'}>Close</Link>
        <Link href={'/sign-up'}>Sign up</Link>
      </Stack>
    </FormModal>
  );
};

export default SignInForm;
