'use server';

import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

import { ALGORITHM, logErrorMessage, SECRET_KEY } from '@/utils';

const key = new TextEncoder().encode(SECRET_KEY);

export const encrypt = async (payload: any) => {
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

export const getUserSession = async () => {
  try {
    const accessToken = cookies().get('access_token')?.value;

    if (!accessToken) {
      return null;
    }

    const decryptedToken = await decrypt(accessToken);

    // Ensure the decrypted token is a plain object
    return JSON.parse(JSON.stringify(decryptedToken));
  } catch (error) {
    logErrorMessage(error, 'processing getUserSession');
    return null;
  }
};
