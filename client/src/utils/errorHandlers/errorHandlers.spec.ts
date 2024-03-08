import toast from 'react-hot-toast';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  logErrorMessage,
  notifyAndLogError,
  readDatabaseError,
  toastNotifyError,
} from './errorHandlers';

vi.mock('react-hot-toast');

describe('errorHandlers', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    vi.clearAllMocks();
  });

  it('readDatabaseError should throw an error with the message from the server', async () => {
    const mockResponse = {
      detail: [{ msg: 'Server error message' }],
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    await expect(
      readDatabaseError(new Response(JSON.stringify(mockResponse))),
    ).rejects.toThrow('Server error message');
  });

  it('logErrorMessage should log the error message', () => {
    console.error = vi.fn();

    const error = new Error('Test error');
    logErrorMessage(error, 'Error detail');

    expect(console.error).toHaveBeenCalledWith(
      'There was an error Error detail - Error: Test error',
    );
  });

  it('notifyAndLogError should notify and log the error message', () => {
    console.error = vi.fn();
    const error = new Error('Test error');
    const toastSpy = vi.spyOn(toast, 'error');

    notifyAndLogError(error, 'Error message');

    expect(toastSpy).toHaveBeenCalledWith(
      'There was an error Error message - Error: Test error',
      expect.anything(),
    );
    expect(console.error).toHaveBeenCalledWith(
      'There was an error Error message - Error: Test error',
    );
  });

  it('toastNotifyError should display a toast notification with the error message', () => {
    const toastSpy = vi.spyOn(toast, 'error');

    toastNotifyError('Error message');

    expect(toastSpy).toHaveBeenCalledWith(
      'There was an error Error message',
      expect.anything(),
    );
  });
});
