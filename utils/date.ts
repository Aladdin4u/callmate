const formatter12hr = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
});

export const formatTime12hr = (time: string | Date) => {
  const now = new Date(time);
  return formatter12hr.format(now);
};

export const formatedDate = (dateInput: string) => {
  const date = new Date(dateInput).toISOString();

  return date.split('T')[0];
};

export const formatedTime = (timeInput: string) => {
  const time = new Date(timeInput).toTimeString();

  return time.split(' ')[0];
};
export const getSecondsFormatter = (dateInput: string, timeInput: string) => {
  const splitedDate = formatedDate(dateInput);
  const splitedTime = formatedTime(timeInput);

  const mergedDateTime = new Date(`${splitedDate}T${splitedTime}`);
  
  const seconds = getSeconds(mergedDateTime);
  const humanSeconds = secondsToHms(seconds);
  return { seconds, humanSeconds };
};

const getSeconds = (date: Date) => {
  const givenDate = new Date(date); // example date
  const now = new Date();

  const diffMs = givenDate.getTime() - now.getTime();

  const diffSeconds = Math.floor(diffMs / 1000);

  return diffSeconds;
};

const secondsToHms = (seconds: number) => {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const dDisplay = d > 0 ? d + (d === 1 ? ' day ' : ' days ') : '';
  const hDisplay = h > 0 ? h + (h === 1 ? ' hour ' : ' hours ') : '';
  const mDisplay = m > 0 ? m + (m === 1 ? ' minute ' : ' minutes ') : '';
  const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';
  return (dDisplay + hDisplay + mDisplay + sDisplay).trim();
};
