import { Typography } from '@/components/Design';

import { DetailsTitleItem } from './index.styled';

interface SectionHeaderProps {
  title: string;
  count: number;
  isVisible: boolean;
  onClick: () => void;
}

export const SectionHeader = ({
  title,
  count,
  isVisible,
  onClick,
}: SectionHeaderProps) => (
  <DetailsTitleItem $isVisible={isVisible} onClick={onClick}>
    <Typography fontSize="h4">
      {title} <Typography component="span">{count}</Typography>
    </Typography>
  </DetailsTitleItem>
);
