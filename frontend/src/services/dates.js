// Local date as YYYY-MM-DD, comparable with the API's date strings
export const toISODate = (date) => {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
};
