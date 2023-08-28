export default function parseStringToDate(date: string): Date {
  const [day, month, year] = date.split("/");
  const dateFormatted = new Date(`${year}-${month}-${day}`);
  return dateFormatted;
}
