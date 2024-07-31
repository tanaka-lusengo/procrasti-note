import { formatRelative, parseISO } from 'date-fns';

export const formatDateRelative = (date: string) => {
  const parsedDate = parseISO(date ? date : '');

  const relativeDate = formatRelative(parsedDate, new Date());
  return relativeDate;
};
