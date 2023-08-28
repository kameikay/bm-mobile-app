import { cepMask } from "./index";

describe("cepMask", () => {
  it("should format a cep string correctly", () => {
    const cep = "12345678";
    const formattedCep = cepMask(cep);
    expect(formattedCep).toEqual("12345-678");
  });

  it("should return an empty string if the input is falsy", () => {
    expect(cepMask("")).toEqual("");
  });
});
