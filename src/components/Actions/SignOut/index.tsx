'use client';

import { useRouter } from 'next/navigation';

import { logout } from '@/server/actions/auth-actions';

import { ButtonText } from './index.styled';

const SignOut = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return <ButtonText onClick={handleLogout}>Sign Out</ButtonText>;
};

export default SignOut;
