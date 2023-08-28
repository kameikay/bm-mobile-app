import formatCurrency from "./index";

describe("formatCurrency", () => {
  it("should format a number as BRL currency", () => {
    const value = 1234.56;
    const formattedValue = formatCurrency(value);
    expect(formattedValue).toEqual("R$ 1.234,56");
  });

  it("should format a negative number as BRL currency", () => {
    const value = -1234.56;
    const formattedValue = formatCurrency(value);
    expect(formattedValue).toEqual("-R$ 1.234,56");
  });

  it("should format zero as BRL currency", () => {
    const value = 0;
    const formattedValue = formatCurrency(value);
    expect(formattedValue).toEqual("R$ 0,00");
  });
});
