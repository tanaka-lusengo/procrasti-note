'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type infer as ZodInfer } from 'zod';

import { Button } from '@/components';
import { FormModal, InputField } from '@/components/FormComponents';
import { signInValidationSchema } from '@/schemas';
import { login } from '@/server/actions/auth-actions';
import { LowerButtonContainer, Title } from '@/styles/common.styled';
import { handleError, toastNotifySuccess } from '@/utils';

import * as Styled from './page.styled';

type SignInForm = ZodInfer<typeof signInValidationSchema>;

const SignInForm = () => {
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
      await login(formData);
      router.push('/notes');
      toastNotifySuccess('Logged In Successfully 😸');
    } catch (error) {
      handleError('logging in 😿', error);
    }
  };

  return (
    <FormModal
      action={async (formData: FormData) => await handleAction(formData)}
    >
      <Title>Sign in</Title>

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

      <Styled.UpperButtonContainer>
        <Button $basefont type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Sign in!'}
        </Button>
      </Styled.UpperButtonContainer>

      <Styled.Divider />

      <Styled.Typography>Don&apos;t have an account?</Styled.Typography>

      <LowerButtonContainer>
        <Link href={'/'}>Close</Link>
        <Link href={'/sign-up'}>Sign up</Link>
      </LowerButtonContainer>
    </FormModal>
  );
};

export default SignInForm;
