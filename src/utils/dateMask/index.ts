export default function dateMask(value: string): string {
  const numericValue = value.replace(/\D/g, "");

  const day = numericValue.slice(0, 2);
  const month = numericValue.slice(2, 4);
  const year = numericValue.slice(4, 8);
  let formattedValue = "";
  if (day) formattedValue += `${day}`;
  if (month) formattedValue += `/${month}`;
  if (year) formattedValue += `/${year}`;

  return formattedValue;
}
