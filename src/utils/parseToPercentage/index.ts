export default function parseToPercentage(value: number) {
  const percentage = value * 100;
  return percentage.toFixed(2).replace(".", ",") + "%";
}
