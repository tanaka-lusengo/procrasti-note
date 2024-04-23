import toast from 'react-hot-toast';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { toastNotifyError } from '../reactHotToast';

import { handleError, logErrorMessage } from './errorHandlers';

vi.mock('react-hot-toast');

describe('errorHandlers', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    vi.clearAllMocks();
  });

  it('logErrorMessage should log the error message', () => {
    console.error = vi.fn();

    const error = new Error('Test error');
    logErrorMessage(error, 'Error detail');

    expect(console.error).toHaveBeenCalledWith(
      'There was an error Error detail - Test error',
    );
  });

  it('handleError should notify and log the error message', () => {
    console.error = vi.fn();
    const error = new Error('Test error');
    const toastSpy = vi.spyOn(toast, 'error');

    handleError('Error message', error);

    expect(toastSpy).toHaveBeenCalledWith(
      'There was an error Error message - Test error',
      expect.anything(),
    );
    expect(console.error).toHaveBeenCalledWith(
      'There was an error Error message - Test error',
    );
  });

  it('toastNotifyError should display a toast notification with the error message', () => {
    const toastSpy = vi.spyOn(toast, 'error');

    toastNotifyError('Error message');

    expect(toastSpy).toHaveBeenCalledWith('Error message', expect.anything());
  });
});
