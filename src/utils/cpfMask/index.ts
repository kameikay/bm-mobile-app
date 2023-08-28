export function cpfMask(v: string): string {
  v = v.replace(/\D/g, "");
  v = v.replace(/^(\d{3})(\d)/g, "$1.$2");
  v = v.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  v = v.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
  v = v.replace(/^(\d{3})\.(\d{3})\.(\d{3})\/(\d{2})(\d)/, "$1.$2.$3-$4");
  return v.substring(0, 14);
}
