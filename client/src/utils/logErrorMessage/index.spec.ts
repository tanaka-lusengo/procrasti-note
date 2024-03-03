import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  MockInstance,
  vi,
} from 'vitest';

import { logErrorMessage } from './index';

describe('logErrorMessage', () => {
  let consoleErrorSpy: MockInstance;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should log the error message and cause if the error is an instance of Error', () => {
    const error = new Error('Test error');
    error.cause = 'Test cause';
    const errorDetail = 'Test error detail';

    logErrorMessage(error, errorDetail);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Error ${errorDetail}`,
      error.message,
      error.cause,
    );
  });

  it('should log the unknown error and detail if the error is not an instance of Error', () => {
    const error = 'Test unknown error';
    const errorDetail = 'Test error detail';

    logErrorMessage(error, errorDetail);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Unknown error ${errorDetail}`,
      error,
    );
  });
});
