export default function capitalizeString(str: string): string {
  if (!str) return ""; // Handle empty or null strings

  const firstLetter = str.charAt(0).toUpperCase();
  const restOfTheString = str.slice(1);

  return firstLetter + restOfTheString;
}
