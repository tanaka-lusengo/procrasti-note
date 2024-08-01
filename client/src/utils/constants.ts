export const COOKIE_EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour
export const SESSION_REFRESH_TIME = 1000 * 60 * 60;

export enum StatusCode {
  SUCCESS = 200,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
