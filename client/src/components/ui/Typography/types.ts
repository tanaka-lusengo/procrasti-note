import { type Theme } from '@/styles/styled';

export type TagVariants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'li';

export type FontSizeVariants = keyof Theme['typography']['fontSize'];

export type ColorVariants = keyof Theme['colors'];
