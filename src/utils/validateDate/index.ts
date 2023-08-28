interface MaxDays {
  [key: string]: number;
}

export default function validateDate(date: Date): boolean {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (isNaN(year) || isNaN(month) || isNaN(day)) return false;

  const maxDays: MaxDays = {
    "01": 31,
    "02": new Date(`${year}-02-29`).getMonth() === 1 ? 29 : 28,
    "03": 31,
    "04": 30,
    "05": 31,
    "06": 30,
    "07": 31,
    "08": 31,
    "09": 30,
    "10": 31,
    "11": 30,
    "12": 31,
  };

  if (year < 1900 || year > 2100) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > maxDays[month]) return false;

  return true;
}
