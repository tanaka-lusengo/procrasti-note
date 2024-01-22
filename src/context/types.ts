import { AuthModel } from 'pocketbase';

export enum AuthProviders {
  Github = 'github',
  Google = 'google',
}

export type EmailPasswordFormValues = {
  email: string;
  password: string;
};

export type ConfirmPasswordResetFormValues = {
  password: string;
  passwordConfirm: string;
};

export type PocketbaseContextType = {
  user: AuthModel;
  signInWithPassword: (values: EmailPasswordFormValues) => Promise<void>;
  signInWithProvider: (provider: AuthProviders) => Promise<void>;
  signUpWithPassword: (values: EmailPasswordFormValues) => Promise<void>;
  handleEmailVerification: (token: string) => Promise<void>;
  handleRequestPasswordReset: (values: { email: string }) => Promise<void>;
  handleConfirmPasswordReset: (
    token: string,
    values: ConfirmPasswordResetFormValues,
  ) => Promise<void>;
  logout: () => void;
};
