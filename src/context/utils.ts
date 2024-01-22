import toast from 'react-hot-toast';

import { toastConfig } from '@/utils';

type ToastVariants = 'error' | 'success';

// Helper function to notify the user of errors or success from the API
export const notifyUser = (toastType: ToastVariants, message: string) => {
  if (toastType === 'error') {
    toast.error(
      `There was an error ${message}, please try again!`,
      toastConfig,
    );
  } else if (toastType === 'success') {
    toast.success(`${message}`, toastConfig);
  }
};
