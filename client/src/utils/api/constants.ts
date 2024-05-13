export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
export const API_URL = process.env.API_URL as string;
export const SECRET_KEY = process.env.SECRET_KEY as string;
export const COOKIE_EXPIRATION_TIME = 1000 * 60 * 60;

export enum StatusCode {
  UNAUTHORIZED = 'Unauthorized',
  SUCCESS = 'Success',
  NOT_FOUND = 'Not Found',
}
