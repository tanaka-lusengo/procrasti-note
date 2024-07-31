import { StatusCode } from '@/utils/api/constants';

export const fetchWithErrors = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    cache: 'no-cache',
  });

  // Check if the user is authenticated, if not, throw an "Unauthorized" error
  if (response.status === StatusCode.UNAUTHORIZED) {
    throw new Error(response.statusText);
  }

  // Check if the response is not ok and throw an error with the error message from the server
  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.statusText} | Status: ${response.status}`,
    );
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
