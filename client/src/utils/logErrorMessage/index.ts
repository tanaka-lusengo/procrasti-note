export const logErrorMessage = (error: unknown, errorDetail: string): void => {
  if (error instanceof Error) {
    console.error(`Error ${errorDetail}`, error.message, error.cause);
  } else {
    console.error(`Unknown error ${errorDetail}`, error);
  }
};
