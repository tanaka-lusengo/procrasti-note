import { readDatabaseError } from '../errorHandlers';

export const fetchWithErrors = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);

  // Check if the response is not ok and throw an error with the error message from the server
  if (!response.ok) {
    return await readDatabaseError(response);
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
