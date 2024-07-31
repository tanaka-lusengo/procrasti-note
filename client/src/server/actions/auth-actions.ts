'use server';

import { cookies } from 'next/headers';

import { type UserCreate } from '@/lib/openapi/generated';
import { signInValidationSchema, signUpValidationSchema } from '@/schemas';
import {
  API_URL,
  COOKIE_EXPIRATION_TIME,
  logErrorMessage,
  StatusCode,
} from '@/utils';

import { decrypt, getCurrentUser } from './action-helpers';

export const signIn = async (formData: FormData) => {
  const userData = Object.fromEntries(formData.entries());

  // Validate formData with zod schema
  const parsedData = signInValidationSchema.parse(userData);

  const parsedFormBody = {
    username: parsedData.email,
    password: parsedData.password,
  };

  const formBody = new URLSearchParams(parsedFormBody).toString();

  try {
    const response = await fetch(`${API_URL}/api/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    });

    if (!response.ok) {
      throw new Error(`Login request failed: ${response.statusText}`);
    }

    const { access_token } = await response.json();

    if (!access_token) {
      throw new Error('Token not received');
    }

    // Save the JWT as a cookie
    const expires = new Date(Date.now() + COOKIE_EXPIRATION_TIME);

    cookies().set('access_token', access_token, { expires, httpOnly: true });

    const { status, data } = await getCurrentUser(access_token);

    if (status === StatusCode.NOT_FOUND || !data) {
      throw new Error('Failed to fetch user data');
    }

    return data;
  } catch (error) {
    logErrorMessage(error, 'logging in (server) 😿');
    throw error;
  }
};

export const logout = async () => {
  cookies().set('access_token', '', { expires: new Date(0).getTime() });
};

export const signUp = async (formData: FormData) => {
  const userData = Object.fromEntries(formData.entries());

  // Validate formData with zod schema
  const parsedData = signUpValidationSchema.parse(userData);

  const createUserData: UserCreate = {
    first_name: parsedData.firstName,
    last_name: parsedData.lastName,
    email: parsedData.email,
    password: parsedData.password,
  };

  try {
    const response = await fetch(`${API_URL}/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createUserData),
    });

    if (!response.ok) {
      throw new Error(`Signup request failed: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    logErrorMessage(error, 'signing up (server) 😿');
  }
};

export const getUserSession = async () => {
  try {
    const accessToken = cookies().get('access_token')?.value;

    if (!accessToken) {
      return null;
    }

    return await decrypt(accessToken);
  } catch (error) {
    logErrorMessage(error, 'processing getUserSession');
    return null;
  }
};
