export default function currencyMask(value: string) {
  return value.replace(/\D/g, "").replace(/(\d)(\d{2})$/, "$1,$2");
}
