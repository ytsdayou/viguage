// eslint-disable-next-line import/prefer-default-export
export const convertSubtitleTimeToPlayerTime = (subtitleTime: string) => {
  const timePattern = /^(\d{1,2}):(\d{1,2}):(\d{1,2}),(\d{1,3})/;
  const match = subtitleTime.match(timePattern);

  if (!match) {
    throw new Error('Invalid subtitle time format.');
  }

  const [, hours, minutes, seconds, milliseconds] = match;

  let totalSeconds =
    parseInt(hours, 10) * 3600 +
    parseInt(minutes, 10) * 60 +
    parseInt(seconds, 10);

  if (milliseconds) {
    totalSeconds += parseInt(milliseconds, 10) / 1000;
  }

  return totalSeconds;
};
