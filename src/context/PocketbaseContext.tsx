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

export enum AuthProviders {
  Github = 'github',
  Google = 'google',
}

type PocketbaseContextType = {
  user: AuthModel;
  signInWithProvider: (provider: AuthProviders) => Promise<void>;
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
      logout,
    }),
    [user, signInWithProvider, logout],
  );

  return (
    <PocketbaseContext.Provider value={contextValue}>
      {children}
    </PocketbaseContext.Provider>
  );
};

export const usePocket = () => {
  const context = useContext(PocketbaseContext);
  if (!context) {
    throw new Error('usePocket must be used within a PocketbaseProvider');
  }
  return context;
};
