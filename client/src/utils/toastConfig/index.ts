import { CSSProperties } from 'styled-components/dist/types';

interface ToastConfig {
  duration: number;
  style: { textAlign: CSSProperties['textAlign'] };
}

export const toastConfig: ToastConfig = {
  duration: 3000,
  style: { textAlign: 'center' },
};
