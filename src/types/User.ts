import { User } from '@prisma/client';

export type UserModel = User;

export type UserCreate = Pick<
  User,
  'first_name' | 'last_name' | 'email' | 'password'
>;

export type UserUpdate = Pick<
  User,
  'first_name' | 'last_name' | 'email' | 'username' | 'is_active'
>;

export type UserUpdatePassword = {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
};
