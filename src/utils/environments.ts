export const isProduction = process.env.NODE_ENV === 'production';

export const SECRET_KEY = process.env.SECRET_KEY as string;

export const ALGORITHM = process.env.ALGORITHM as string;
