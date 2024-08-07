import { User } from '@prisma/client';

export type UserModel = User;

export type UserCreate = Pick<
  User,
  'firstName' | 'lastName' | 'email' | 'password'
>;

export type UserUpdate = Pick<
  User,
  'firstName' | 'lastName' | 'email' | 'username' | 'isActive'
>;

export type UserUpdatePassword = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
