import { theme } from '@/styles';

export const FONTSIZE_MAP = {
  body1: theme.typography.fontSize.body1,
  body2: theme.typography.fontSize.body2,
  h1: theme.typography.fontSize.h1,
  h2: theme.typography.fontSize.h2,
  h3: theme.typography.fontSize.h3,
  h4: theme.typography.fontSize.h4,
  h5: theme.typography.fontSize.h5,
  h6: theme.typography.fontSize.h6,
  p: theme.typography.fontSize.body1,
  span: theme.typography.fontSize.body1,
  li: theme.typography.fontSize.body1,
} as const satisfies Record<string, number>;

export const SPACING_MAP = {
  xs: theme.spacing.gap.xs,
  sm: theme.spacing.gap.sm,
  md: theme.spacing.gap.md,
  lg: theme.spacing.gap.lg,
  xl: theme.spacing.gap.xl,
} as const satisfies Record<string, number>;
