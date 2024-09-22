import { User } from '@prisma/client';

export type UserModel = Omit<User, 'password'>;

export type UserCreate = Pick<
  User,
  'firstName' | 'lastName' | 'email' | 'password'
>;

export type UserUpdate = Pick<
  User,
  'firstName' | 'lastName' | 'email' | 'username' | 'isActive'
>;
