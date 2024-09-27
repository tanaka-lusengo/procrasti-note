'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getUserSession } from '@/server/actions/helpers';
import { type UserModel } from '@/types';
import { logErrorMessage } from '@/utils';

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContextType = {
  user: UserModel | null;
  setUser: Dispatch<SetStateAction<UserModel | null>>;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    // Fetch user data from the cookie when the provider initializes
    const fetchUser = async () => {
      try {
        const userSession = await getUserSession();
        setUser(userSession);
      } catch (error) {
        logErrorMessage(error, 'fetching user session in UserContextProvider');
      }
    };

    fetchUser();
  }, []);

  const contextValue = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserContextProvider');
  }

  return context;
};
