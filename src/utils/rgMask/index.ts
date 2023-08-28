export default function formatRG(rg: string): string {
  const digits = rg.replace(/\D/g, "");

  if (digits.length <= 8) {
    return digits.replace(/(\d{1,2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
  } else {
    const firstPart = digits.substr(0, 2);
    const secondPart = digits.substr(2, 3);
    const thirdPart = digits.substr(5, 3);
    const verifier = digits.substr(8);

    return `${firstPart}.${secondPart}.${thirdPart}-${verifier}`;
  }
}
