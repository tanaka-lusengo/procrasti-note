'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type infer as ZodInfer } from 'zod';

import { Button } from '@/components';
import { FormModal, InputField } from '@/components/FormComponents';
import { signUpValidationSchema } from '@/schemas';
import { signUp } from '@/server/actions/auth-actions';
import { LowerButtonContainer, Title } from '@/styles/common.styled';
import {
  handleError,
  StatusCode,
  toastNotifyError,
  toastNotifySuccess,
} from '@/utils';

type SignUpForm = ZodInfer<typeof signUpValidationSchema>;

const SignUpForm = () => {
  const router = useRouter();

  const {
    register,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpValidationSchema),
    mode: 'all',
  });

  const handleAction = async (formData: FormData) => {
    try {
      const data = await signUp(formData);

      if (data?.status === StatusCode.SUCCESS) {
        toastNotifySuccess('Sign up Success, now Sign in! 😸');
        router.push('/sign-in');
      } else {
        toastNotifyError('Sign up failed 😿');
      }
    } catch (error) {
      handleError('signing up 😿', error);
    }
  };

  return (
    <FormModal
      action={async (formData: FormData) => await handleAction(formData)}
    >
      <Title>Sign up</Title>

      <InputField
        label="First Name"
        name="firstName"
        placeholder="Lewis"
        register={register}
        errors={errors}
      />

      <InputField
        label="Last Name"
        name="lastName"
        placeholder="Hamilton"
        register={register}
        errors={errors}
      />

      <InputField
        label="Email"
        name="email"
        type="email"
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

      <LowerButtonContainer>
        <Button $basefont type="submit" disabled={isSubmitting || !isValid}>
          {isSubmitting ? 'Loading...' : 'Sign up!'}
        </Button>

        <Link href={'/'} type="link">
          Close
        </Link>
      </LowerButtonContainer>
    </FormModal>
  );
};

export default SignUpForm;
