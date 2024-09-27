'use server';

import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { ulid } from 'ulid';

import { prisma } from '@/lib';
import {
  forgotPasswordValidationSchema,
  resetPasswordValidationSchema,
  signInValidationSchema,
  signUpValidationSchema,
} from '@/schemas';
import type { UserCreate } from '@/types';
import { COOKIE_EXPIRATION_TIME, logErrorMessage, StatusCode } from '@/utils';

import { encrypt, sendPasswordResetEmail } from './helpers';

export const signIn = async (formData: FormData) => {
  const userData = Object.fromEntries(formData.entries());

  try {
    // Validate formData with zod schema
    const parsedData = signInValidationSchema.parse(userData);

    const user = await prisma.user.findUnique({
      where: { email: parsedData.email },
    });

    if (!user) {
      return {
        status: StatusCode.NOT_FOUND,
        data: null,
        error: 'There was an error logging in 😿 - User not found',
      };
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(
      parsedData.password,
      user.password,
    );

    if (!isPasswordValid) {
      return {
        status: StatusCode.UNAUTHORIZED,
        data: null,
        error: 'There was an error logging in 😿 - Invalid password',
      };
    }

    // Remove the password from the user object
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    // Create accessToken and save a JWT as a cookie
    const encodedUser = { ...userWithoutPassword };
    const expires = new Date(Date.now() + COOKIE_EXPIRATION_TIME);
    const accessToken = await encrypt({ ...encodedUser, expires });

    cookies().set('access_token', accessToken, { expires, httpOnly: true });

    return {
      status: StatusCode.SUCCESS,
      data: userWithoutPassword,
      error: null,
    };
  } catch (error) {
    logErrorMessage(error, 'logging in (server) 😿');
    return { status: StatusCode.INTERNAL_SERVER_ERROR, data: null, error };
  }
};

export const logout = async () => {
  try {
    cookies().set('access_token', '', { expires: new Date(0) });
    return {
      status: StatusCode.NO_CONTENT,
      message: 'Logged out successfully',
    };
  } catch (error) {
    logErrorMessage(error, 'logging out (server) 😿');
    return { status: StatusCode.INTERNAL_SERVER_ERROR, error };
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
      firstName: parsedData.firstName,
      lastName: parsedData.lastName,
      email: parsedData.email,
      password: hashedPassword,
    };

    await prisma.user.create({ data: createUserData });

    return { status: StatusCode.NO_CONTENT, error: null };
  } catch (error) {
    logErrorMessage(error, 'signing up (server) 😿');
    return { status: StatusCode.INTERNAL_SERVER_ERROR, error };
  }
};

export const forgotPassword = async (formData: FormData) => {
  const userData = Object.fromEntries(formData.entries());

  try {
    // Validate formData with zod schema
    const parsedData = forgotPasswordValidationSchema.parse(userData);

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email: parsedData.email },
    });

    if (!user) {
      return {
        status: StatusCode.NOT_FOUND,
        data: null,
        error: 'There was an error requesting new password 😿 - User not found',
      };
    }

    // Generate a token
    const token = ulid();

    // Save the token in the database
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
      },
    });

    // Send email with Postmark
    const data = await sendPasswordResetEmail(
      token,
      user.firstName,
      user.email,
    );

    if (data) {
      return { status: StatusCode.SUCCESS, data: data.To, error: null };
    } else {
      return {
        status: StatusCode.BAD_REQUEST,
        data: null,
        error: 'There was an error requesting a new password 😿',
      };
    }
  } catch (error) {
    logErrorMessage(error, 'requesting new password 😿');
    return { status: StatusCode.INTERNAL_SERVER_ERROR, data: null, error };
  }
};

export const resetPassword = async (formData: FormData, token: string) => {
  const userData = Object.fromEntries(formData.entries());

  try {
    // Validate formData with zod schema
    const parsedData = resetPasswordValidationSchema.parse(userData);

    // check if the passwords match
    if (parsedData.newPassword !== parsedData.confirmPassword) {
      return {
        status: StatusCode.BAD_REQUEST,
        data: null,
        error: 'Passwords do not match, please try again',
      };
    }

    // Check if the password reset token exists in the database and is valid
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: {
        token,
        // Ensure the token was created within the last 1 hour
        createdAt: { gt: new Date(Date.now() - 1 * 60 * 60 * 1000) },
        // Ensure the token has not been used yet
        resetAt: null,
      },
    });

    if (!passwordResetToken) {
      return {
        status: StatusCode.BAD_REQUEST,
        data: null,
        error:
          'Invalid or expired token, please try resetting your password again',
      };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(parsedData.newPassword, 10);

    // Update the user's password
    const updateUser = prisma.user.update({
      where: { id: passwordResetToken.userId },
      data: { password: hashedPassword },
    });

    // Mark the passwordResetToken as used
    const updatePasswordResetToken = prisma.passwordResetToken.update({
      where: { id: passwordResetToken.id },
      data: { resetAt: new Date() },
    });

    // Update the user's password and mark the token as 'used' in a transaction to ensure data integrity and consistency in the database
    const [updatedUser] = await prisma.$transaction([
      updateUser,
      updatePasswordResetToken,
    ]);

    return {
      status: StatusCode.SUCCESS,
      data: updatedUser.firstName,
      error: null,
    };
  } catch (error) {
    logErrorMessage(error, 'resetting password (server) 😿');
    return { status: StatusCode.INTERNAL_SERVER_ERROR, data: null, error };
  }
};
