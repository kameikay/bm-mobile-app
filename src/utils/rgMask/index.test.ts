import formatRG from "./index";

describe("formatRG", () => {
  it("should format an RG string with 8 digits correctly", () => {
    const rg = "12345678";
    const formattedRG = formatRG(rg);
    expect(formattedRG).toEqual("1.234.567-8");
  });

  it("should format an RG string with 9 digits correctly", () => {
    const rg = "123456789";
    const formattedRG = formatRG(rg);
    expect(formattedRG).toEqual("12.345.678-9");
  });

  it("should return an empty string if the input is falsy", () => {
    expect(formatRG("")).toEqual("");
  });
});
