import toast from 'react-hot-toast';
import { CSSProperties } from 'styled-components/dist/types';

interface ToastConfig {
  duration: number;
  style: { textAlign: CSSProperties['textAlign'] };
}

const toastConfig: ToastConfig = {
  duration: 3000,
  style: { textAlign: 'center' },
};

// Toast Notifications
export const toastNotifyError = (message: string) =>
  toast.error(`There was an error ${message}`, toastConfig);
