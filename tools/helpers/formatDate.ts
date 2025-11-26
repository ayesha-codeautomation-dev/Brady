const formatDate = (date: string | null): string => {
  if (!date) return '';
  // Format string to date string formatted like "24 Dec 2043".
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export default formatDate;
