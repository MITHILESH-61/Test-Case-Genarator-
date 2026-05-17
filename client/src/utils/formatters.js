export const formatDate = (value) => {
  if (!value) return 'Unknown';

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value));
};

export const truncate = (value = '', length = 120) => {
  if (value.length <= length) return value;
  return `${value.slice(0, length - 3)}...`;
};

