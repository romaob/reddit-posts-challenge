export enum TIME_VALUES {
  MINUTE = 60,
  HOUR = 3600,
  DAY = 86400,
  WEEK = 604800,
  MONTH = 2592000,
  YEAR = 31104000,
}

export function getRelativeTimeFromNow(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < TIME_VALUES.MINUTE) {
    return `${diff} second${diff !== 1 ? 's' : ''} ago`;
  }

  if (diff < TIME_VALUES.HOUR) {
    return `${Math.floor(diff / TIME_VALUES.MINUTE)} minute${
      Math.floor(diff / TIME_VALUES.MINUTE) !== 1 ? 's' : ''
    } ago`;
  }

  if (diff < TIME_VALUES.DAY) {
    return `${Math.floor(diff / TIME_VALUES.HOUR)} hour${
      Math.floor(diff / TIME_VALUES.HOUR) !== 1 ? 's' : ''
    } ago`;
  }

  if (diff < TIME_VALUES.WEEK) {
    return `${Math.floor(diff / TIME_VALUES.DAY)} day${
      Math.floor(diff / TIME_VALUES.DAY) !== 1 ? 's' : ''
    } ago`;
  }

  if (diff < TIME_VALUES.MONTH) {
    return `${Math.floor(diff / TIME_VALUES.WEEK)} week${
      Math.floor(diff / TIME_VALUES.WEEK) !== 1 ? 's' : ''
    } ago`;
  }

  if (diff < TIME_VALUES.YEAR) {
    return `${Math.floor(diff / TIME_VALUES.MONTH)} month${
      Math.floor(diff / TIME_VALUES.MONTH) !== 1 ? 's' : ''
    } ago`;
  }

  return `${Math.floor(diff / TIME_VALUES.YEAR)} year${
    Math.floor(diff / TIME_VALUES.YEAR) !== 1 ? 's' : ''
  } ago ${diff}`;
}
