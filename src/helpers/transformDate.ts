

// date = 2024-07-24T03:15:10.907Z
export const transformDate = (date: string) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  // hour, minutes, seconds
  const hour = newDate.getHours();
  const minutes = newDate.getMinutes();
  const seconds = newDate.getSeconds();

  return `${day}/${month} - ${hour}:${minutes}:${seconds}`;
}