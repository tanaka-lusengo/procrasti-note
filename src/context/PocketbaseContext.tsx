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
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import type { AuthModel } from 'pocketbase';

import { pb } from '@/lib';
import { logErrorMessage, toastConfig } from '@/utils';

export enum AuthProviders {
  Github = 'github',
  Google = 'google',
}

type PocketbaseContextType = {
  user: AuthModel;
  signInWithProvider: (provider: AuthProviders) => Promise<void>;
  handleEmailVerification: (token: string) => Promise<void>;
  logout: () => void;
};

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

  /**
   * This function handles sign in with a specific provider.
   *
   * @param {string} provider - The provider to sign in with.
   */
  const signInWithProvider = useCallback(
    async (provider: AuthProviders) => {
      try {
        await pb.collection('users').authWithOAuth2({ provider });
        router.push('/notes');
      } catch (error) {
        logErrorMessage(error, `signing in with Provider: ${provider} 😿`);
        router.back();
      }
    },
    [router],
  );

  /**
   * This function handles email verification.
   *
   * Remember to add a <Toaster> component from 'react-hot-toast' into your component
   *
   * @param {string} token
   */
  const handleEmailVerification = useCallback(
    async (token: string) => {
      const notifyError = () =>
        toast.error(
          'There was an error verifying your email 😿, please try again!',
          toastConfig,
        );
      const notifySuccess = () =>
        toast.success(
          'Your email has been successfully verified 🎉, now sign in!',
          toastConfig,
        );

      try {
        await pb.collection('users').confirmVerification(token);
        notifySuccess();
      } catch (error) {
        logErrorMessage(error, 'verifiying email address 😿');
        notifyError();
      } finally {
        router.push('/sign-in');
      }
    },
    [router],
  );

  /**
   * This function handles user logout.
   */
  const logout = useCallback(() => {
    try {
      pb.authStore.clear();
      router.push('/');
    } catch (error) {
      logErrorMessage(error, 'logging out 😿');
    }
  }, [router]);

  const contextValue: PocketbaseContextType = useMemo(
    () => ({
      user,
      signInWithProvider,
      handleEmailVerification,
      logout,
    }),
    [user, signInWithProvider, handleEmailVerification, logout],
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
 * @returns Returns the current context of the Pocket.
 */
export const usePocket = () => {
  const context = useContext(PocketbaseContext);
  if (!context) {
    throw new Error('usePocket must be used within a PocketbaseProvider');
  }
  return context;
};
