const formatter12hr = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
});

export const formatTime = (time: string | Date) => {
  const now = new Date(time);
  return formatter12hr.format(now);
};
