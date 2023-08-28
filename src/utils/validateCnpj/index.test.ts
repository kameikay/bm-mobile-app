import { validateCnpj } from ".";

describe("CNPJ Validation", () => {
  it("should validate a valid CNPJ", () => {
    expect(validateCnpj("12.345.678/0001-00")).toBe(true);
  });

  it("should not validate an invalid CNPJ", () => {
    expect(validateCnpj("11.222.333/4444-55")).toBe(false);
  });

  it("should not validate a CNPJ with incorrect length", () => {
    expect(validateCnpj("123")).toBe(false);
    expect(validateCnpj("12.345.678/0001-000")).toBe(false);
  });

  it("should not validate a CNPJ with non-numeric characters", () => {
    expect(validateCnpj("12.34a.678/0001-00")).toBe(false);
    expect(validateCnpj("12.345.678/0001-x0")).toBe(false);
  });
});
