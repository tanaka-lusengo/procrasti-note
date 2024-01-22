'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import type { AuthModel } from 'pocketbase';

import { pb } from '@/lib';
import { logErrorMessage } from '@/utils';

import {
  type AuthProviders,
  type ConfirmPasswordResetFormValues,
  type EmailPasswordFormValues,
  type PocketbaseContextType,
} from './types';
import { notifyUser } from './utils';

const PocketbaseContext = createContext<PocketbaseContextType | undefined>(
  undefined,
);

export const PocketbaseProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthModel>(pb.authStore.model);

  const router = useRouter();

  useEffect(() => {
    return pb.authStore.onChange((_, newUser) => {
      setUser(newUser);
    });
  }, []);

  const signInWithPassword = useCallback(
    async (values: EmailPasswordFormValues) => {
      try {
        const { email, password } = values || {};

        await pb.collection('users').authWithPassword(email, password);
        router.push('/notes');
      } catch (error) {
        notifyUser('error', 'signing in, wrong password maybe? 🥺');
        logErrorMessage(error, 'signing in 😿');
      }
    },
    [router],
  );

  const signInWithProvider = useCallback(
    async (provider: AuthProviders) => {
      try {
        await pb.collection('users').authWithOAuth2({ provider });
        router.push('/notes');
      } catch (error) {
        notifyUser('error', `signing in with Provider: ${provider} 🥺`);
        logErrorMessage(error, `signing in with Provider: ${provider} 😿`);
      }
    },
    [router],
  );

  const signUpWithPassword = useCallback(
    async (values: EmailPasswordFormValues) => {
      try {
        const { email, password } = values || {};

        const userData = {
          email,
          password,
          passwordConfirm: password,
        };

        await pb.collection('users').create(userData);
        await pb.collection('users').requestVerification(email);
        notifyUser('success', 'Sign up successful 🎉, now verify your email!');
      } catch (error) {
        notifyUser('error', 'signing up 🥺');
        logErrorMessage(error, 'signing up 😿');
      } finally {
        router.push('?check-email=true');
      }
    },
    [router],
  );

  const handleEmailVerification = useCallback(
    async (token: string) => {
      try {
        await pb.collection('users').confirmVerification(token);
        notifyUser(
          'success',
          'Your email has been successfully verified 🎉, now sign in!',
        );
      } catch (error) {
        notifyUser('error', 'verifying your email 🥺');
        logErrorMessage(error, 'verifiying email address 😿');
      } finally {
        router.push('/sign-in');
      }
    },
    [router],
  );

  const handleRequestPasswordReset = useCallback(
    async (values: { email: string }) => {
      try {
        const { email } = values || {};
        await pb.collection('users').requestPasswordReset(email);
        notifyUser('success', 'Email sent successfully 🎉');
      } catch (error) {
        notifyUser('error', 'requesting a new password 🥺');
        logErrorMessage(error, 'requesting new password 😿');
      } finally {
        router.back();
      }
    },
    [router],
  );

  const handleConfirmPasswordReset = useCallback(
    async (token: string, values: ConfirmPasswordResetFormValues) => {
      try {
        const { password, passwordConfirm } = values || {};

        await pb
          .collection('users')
          .confirmPasswordReset(token, password, passwordConfirm);
        notifyUser('success', 'Your password has been changed successfully 🎉');
      } catch (error) {
        notifyUser('error', 'confirming your password 🥺');
        logErrorMessage(error, 'confirming new password 😿');
      } finally {
        router.push('/sign-in');
      }
    },
    [router],
  );

  const logout = useCallback(() => {
    try {
      pb.authStore.clear();
      router.push('/');
    } catch (error) {
      notifyUser('error', 'logging out 🥺');
      logErrorMessage(error, 'logging out 😿');
    }
  }, [router]);

  const contextValue: PocketbaseContextType = useMemo(
    () => ({
      user,
      signInWithPassword,
      signInWithProvider,
      signUpWithPassword,
      handleEmailVerification,
      handleRequestPasswordReset,
      handleConfirmPasswordReset,
      logout,
    }),
    [
      user,
      signInWithPassword,
      signInWithProvider,
      signUpWithPassword,
      handleEmailVerification,
      handleRequestPasswordReset,
      handleConfirmPasswordReset,
      logout,
    ],
  );

  return (
    <PocketbaseContext.Provider value={contextValue}>
      {children}
    </PocketbaseContext.Provider>
  );
};

/**
 * This function provides access to the Pocket context.
 *
 * Also, remember to add a "Toaster" component from 'react-hot-toast' into your component to display error messages for methods that use the notifyUser function. Refer to the PocketbaseContext.tsx file for more information.
 *
 * @returns Returns the current context of the Pocketbase Context.
 */
export const usePocket = () => {
  const context = useContext(PocketbaseContext);
  if (!context) {
    throw new Error('usePocket must be used within a PocketbaseProvider');
  }
  return context;
};
