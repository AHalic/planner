import { format } from "date-fns";

export const formatDateRange = (from: Date | string, to: Date | string) => {
    const sameMonth = format(from, 'MMMM') === format(to, 'MMMM');

    if (sameMonth) {
      // Same month, different days
      return `${format(from, 'LLL do')} to ${format(to, 'do')}`;
    } else {
      // Different months
      return `${format(from, 'LLL do')} to ${format(to, 'LLL do')}`;
    }
};
