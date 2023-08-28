import { cpfMask } from ".";

describe("CPF Mask", () => {
  test("should return correct CPF Mask", () => {
    expect(cpfMask("52998224725")).toEqual("529.982.247-25");
    expect(cpfMask("123")).toEqual("123");
  });
});
