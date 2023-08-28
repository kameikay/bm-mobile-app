import dateMask from "./";

describe("dateMask", () => {
  it("should formats the input as day/month/year", () => {
    expect(dateMask("01/01/2022")).toBe("01/01/2022");
    expect(dateMask("01012022")).toBe("01/01/2022");
    expect(dateMask("010122")).toBe("01/01/22");
  });

  it("should returns an empty string for invalid input", () => {
    expect(dateMask("01/a1/2022")).toBe("01/12/022");
    expect(dateMask("01/01/a1a1")).toBe("01/01/11");
  });
});
