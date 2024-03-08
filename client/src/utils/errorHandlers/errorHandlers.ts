import toast from 'react-hot-toast';

import { toastConfig } from '../toastConfig';

type ErrorData = {
  detail: {
    msg: string;
  }[];
};

export const readDatabaseError = async (response: Response) => {
  const errorData: ErrorData = await response.json(); // Extract error data from response body
  throw new Error(errorData.detail[0].msg); // Use the error message from the server
};

export const logErrorMessage = (error: unknown, errorDetail: string): void => {
  if (error instanceof Error) {
    console.error(`There was an error ${errorDetail} - ${error}`);
  } else {
    console.error(`Unknown error ${errorDetail}`, error);
  }
};

export const notifyAndLogError = (error: unknown, message: string) => {
  if (error instanceof Error) {
    toastNotifyError(`${message} - ${error}`);
    logErrorMessage(error, message);
  } else {
    console.error(`Unknown error ${message}`, error);
  }
};

// Toast Notifications
export const toastNotifyError = (message: string) =>
  toast.error(`There was an error ${message}`, toastConfig);
