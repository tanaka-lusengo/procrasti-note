import { getAccessToken } from '@/server/actions/action-helpers';

export const fetchWithErrors = async (url: string, options?: RequestInit) => {
  const accessToken = await getAccessToken();

  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    cache: 'no-cache',
    headers: {
      ...options?.headers,
      ...(accessToken && { authorization: `Bearer ${accessToken}` }),
    },
  });

  // Check if the user is authenticated, if not, throw an "Unauthorized" error
  if (response.status === 401) {
    throw new Error(response.statusText);
  }

  // Check if the response is not ok and throw an error with the error message from the server
  if (!response.ok) {
    throw new Error(`Request failed: ${response.statusText}`);
  }

  // Check if the response has a body before trying to parse it due to the possibility of an empty body on a successful response with status 204
  if (
    response.headers.get('content-length') === '0' ||
    response.status === 204
  ) {
    return null;
  }

  return await response.json();
};
