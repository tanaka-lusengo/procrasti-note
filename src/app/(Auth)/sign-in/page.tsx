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
import { handleError, toastNotifySuccess } from '@/utils';

type SignInForm = ZodInfer<typeof signInValidationSchema>;

const SignInForm = () => {
  const { setUser } = useUser();
  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInValidationSchema),
    mode: 'all',
  });

  const handleAction = async (formData: FormData) => {
    try {
      const response = await fetch('/api/sign-in', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUser(result.data);
        toastNotifySuccess('Logged In Successfully 😸');
        router.push('/notes');
      } else {
        handleError('logging in 😿', response.statusText);
      }
    } catch (error) {
      handleError('logging in 😿', error);
    }
  };

  return (
    <FormModal
      action={async (formData: FormData) => await handleAction(formData)}
    >
      <Typography marginTop="sm" marginBottom="md" textAlign="center">
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

      <Button $basefont type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Loading...' : 'Sign in!'}
      </Button>

      <Divider />

      <Typography component="p" fontSize="h6" color="primary" textAlign="end">
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
