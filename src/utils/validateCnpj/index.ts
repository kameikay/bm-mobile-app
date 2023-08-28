export function validateCnpj(cnpj: string): boolean {
  cnpj = cnpj.replace(/\D/g, "");

  if (cnpj.length !== 14) {
    return false;
  }

  const cnpjArray = cnpj.split("").map((item) => Number(item));

  const firstDigit = cnpjArray[12];
  const secondDigit = cnpjArray[13];

  const firstDigitSum =
    cnpjArray[0] * 5 +
    cnpjArray[1] * 4 +
    cnpjArray[2] * 3 +
    cnpjArray[3] * 2 +
    cnpjArray[4] * 9 +
    cnpjArray[5] * 8 +
    cnpjArray[6] * 7 +
    cnpjArray[7] * 6 +
    cnpjArray[8] * 5 +
    cnpjArray[9] * 4 +
    cnpjArray[10] * 3 +
    cnpjArray[11] * 2;

  const firstDigitRemainder = firstDigitSum % 11;

  const firstDigitResult =
    firstDigitRemainder < 2 ? 0 : 11 - firstDigitRemainder;

  const secondDigitSum =
    cnpjArray[0] * 6 +
    cnpjArray[1] * 5 +
    cnpjArray[2] * 4 +
    cnpjArray[3] * 3 +
    cnpjArray[4] * 2 +
    cnpjArray[5] * 9 +
    cnpjArray[6] * 8 +
    cnpjArray[7] * 7 +
    cnpjArray[8] * 6 +
    cnpjArray[9] * 5 +
    cnpjArray[10] * 4 +
    cnpjArray[11] * 3 +
    firstDigitResult * 2;

  const secondDigitRemainder = secondDigitSum % 11;

  const secondDigitResult =
    secondDigitRemainder < 2 ? 0 : 11 - secondDigitRemainder;

  if (firstDigit === firstDigitResult && secondDigit === secondDigitResult) {
    return true;
  }

  return false;
}
