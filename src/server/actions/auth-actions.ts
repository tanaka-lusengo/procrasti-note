'use server';

import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

import { prisma } from '@/lib';
import { signInValidationSchema, signUpValidationSchema } from '@/schemas';
import type { UserCreate } from '@/types';
import { COOKIE_EXPIRATION_TIME, logErrorMessage, StatusCode } from '@/utils';

import { InvalidPasswordError, UserNotFoundError } from '../errors';

import { encrypt } from './helpers';

export const signIn = async (formData: FormData) => {
  const userData = Object.fromEntries(formData.entries());

  try {
    // Validate formData with zod schema
    const parsedData = signInValidationSchema.parse(userData);

    const user = await prisma.user.findUnique({
      where: { email: parsedData.email },
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(
      parsedData.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new InvalidPasswordError();
    }

    // Remove the password from the user object
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    // Create accessToken and save a JWT as a cookie
    const encodedUser = { id: user.id, email: user.email };
    const expires = new Date(Date.now() + COOKIE_EXPIRATION_TIME);
    const accessToken = await encrypt({ ...encodedUser, expires });

    cookies().set('access_token', accessToken, { expires, httpOnly: true });

    return { status: StatusCode.SUCCESS, data: userWithoutPassword };
  } catch (error) {
    logErrorMessage(error, 'logging in (server) 😿');
    throw error;
  }
};

export const logout = async () => {
  try {
    cookies().set('access_token', '', { expires: new Date(0) });
  } catch (error) {
    logErrorMessage(error, 'logging out (server) 😿');
    throw error;
  }
};

export const signUp = async (formData: FormData) => {
  const userData = Object.fromEntries(formData.entries());

  try {
    // Validate formData with zod schema
    const parsedData = signUpValidationSchema.parse(userData);

    // Hash the password
    const hashedPassword = await bcrypt.hash(parsedData.password, 10);

    const createUserData: UserCreate = {
      first_name: parsedData.firstName,
      last_name: parsedData.lastName,
      email: parsedData.email,
      password: hashedPassword,
    };

    await prisma.user.create({ data: createUserData });

    return { status: StatusCode.SUCCESS };
  } catch (error) {
    logErrorMessage(error, 'signing up (server) 😿');
    throw error;
  }
};
