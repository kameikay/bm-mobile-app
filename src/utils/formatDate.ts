export default function formatDate(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date);
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}
