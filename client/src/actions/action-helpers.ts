import { type JWTPayload, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

import { logErrorMessage, SECRET_KEY } from '@/utils';

const key = new TextEncoder().encode(SECRET_KEY);

export const decrypt = async (token: string) => {
  const { payload } = await jwtVerify(token, key, {
    algorithms: ['HS256'],
  });
  return payload;
};

export const getAccessToken = async () => {
  try {
    const accessToken = cookies().get('access_token')?.value;

    if (!accessToken) {
      return null;
    }

    return accessToken;
  } catch (error) {
    logErrorMessage(error, 'processing getAccessToken');
    return null;
  }
};

type ParsedToken =
  | (JWTPayload & {
      id: number;
    })
  | null;

export const getCurrentUser = async (
  accessToken: string,
): Promise<ParsedToken> => {
  try {
    if (!accessToken) {
      return null;
    }

    // TODO: Update to make request to the server to get the user data
    const decryptedToken = await decrypt(accessToken);
    const { id } = decryptedToken;

    return {
      ...decryptedToken,
      id: id as number,
    };
  } catch (error) {
    logErrorMessage(error, 'processing getCurrentUser');
    return null;
  }
};
