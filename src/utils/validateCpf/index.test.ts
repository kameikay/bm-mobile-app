import { validateCPF } from ".";

describe("CPF validation", () => {
  it("should return true for a valid CPF", () => {
    expect(validateCPF("529.982.247-25")).toBe(true);
  });

  it("should return false for an invalid CPF", () => {
    expect(validateCPF("529.982.247-24")).toBe(false);
  });

  it("should return false for a CPF with less than 11 digits", () => {
    expect(validateCPF("1234567890")).toBe(false);
  });

  it("should return false for a CPF with more than 11 digits", () => {
    expect(validateCPF("123.456.789-123")).toBe(false);
  });

  it("should return false for a CPF with only one repeated digit", () => {
    expect(validateCPF("111.111.111-11")).toBe(false);
  });

  it("should return false for a CPF with only two repeated digits", () => {
    expect(validateCPF("222.222.222-22")).toBe(false);
  });

  it("should return false for a CPF with an invalid check digit", () => {
    expect(validateCPF("529.982.247-24")).toBe(false);
  });
});
