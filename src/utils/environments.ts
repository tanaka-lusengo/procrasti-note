export const isProduction = process.env.NODE_ENV === 'production';

export const domainUrl = isProduction
  ? process.env.PRODUCTION_BASE_URL
  : process.env.DEV_BASE_URL;

export const SECRET_KEY = process.env.SECRET_KEY as string;

export const ALGORITHM = process.env.ALGORITHM as string;
