'use server';

import { type JWTPayload, jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import postmark from 'postmark';

import { type UserModel } from '@/types';
import {
  ALGORITHM,
  domainUrl,
  logErrorMessage,
  POSTMARK_SERVER_TOKEN,
  SECRET_KEY,
} from '@/utils';

const key = new TextEncoder().encode(SECRET_KEY);

export const encrypt = async (payload: JWTPayload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime('1hr')
    .sign(key);
};

export const decrypt = async (token: string) => {
  const { payload } = await jwtVerify(token, key, {
    algorithms: [ALGORITHM],
  });
  return payload;
};

export const getUserSession = async (): Promise<UserModel | null> => {
  try {
    const accessToken = cookies().get('access_token')?.value;

    if (!accessToken) {
      redirect('/sign-in');
    }

    const decryptedToken = await decrypt(accessToken);

    return JSON.parse(JSON.stringify(decryptedToken));
  } catch (error) {
    logErrorMessage(error, 'processing getUserSession');
    return null;
  }
};

export const sendPasswordResetEmail = async (
  token: string,
  userName: string,
  userEmail: string,
) => {
  // Send email with Postmark
  const client = new postmark.ServerClient(POSTMARK_SERVER_TOKEN);

  // Create the email body
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Password Reset Request</h2>
      <p>Hey, ${userName}!</p>
      <p>You requested a password reset for your Procrasti-Not(e) account. Click the link below to reset your password:</p>
      <p>
        <a href="${domainUrl}/reset-password/${token}" style="background-color: #ff6161; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
      </p>
      <p style="padding-bottom: 10px;">This link will expire in 1 hour. Please set it up as soon as possible, or you will need to repeat the process.</p>
      <p>If you did not request this, please ignore this email or contact support if you have questions.</p>
      <p>Thanks,<br/>The Procrasti-Not(e) Team 😎</p>
    </div>
  `;

  const result = await client.sendEmail(
    {
      From: 'tanaka@lusengophotography.com',
      To: userEmail,
      Subject: 'Password Reset Request',
      HtmlBody: htmlBody,
      MessageStream: 'outbound',
    },
    (error) => {
      if (error) {
        logErrorMessage(
          error,
          'sending password reset request via postmark in "sendPasswordResetEmail" function 😿:',
        );
      }
    },
  );

  return result;
};
