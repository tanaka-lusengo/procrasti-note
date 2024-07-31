import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

import { type User } from '@/lib/openapi/generated';
import {
  ALGORITHM,
  API_URL,
  fetchWithErrors,
  logErrorMessage,
  SECRET_KEY,
  StatusCode,
} from '@/utils';

const key = new TextEncoder().encode(SECRET_KEY);

export const decrypt = async (token: string) => {
  const { payload } = await jwtVerify(token, key, {
    algorithms: [ALGORITHM],
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

export const getCurrentUser = async (access_token: string) => {
  try {
    const user: User = await fetchWithErrors(`${API_URL}/api/user`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });

    return { status: StatusCode.SUCCESS, data: user };
  } catch (error) {
    logErrorMessage(error, 'processing getCurrentUser');
    return { status: StatusCode.NOT_FOUND, data: null };
  }
};
