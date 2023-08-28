import { phoneMask } from "./index";

describe("phoneMask", () => {
  it("should format a phone number correctly", () => {
    const phoneNumber = "11987654321";
    const formattedPhoneNumber = phoneMask(phoneNumber);
    expect(formattedPhoneNumber).toEqual("(11) 98765-4321");
  });

  it("should return an empty string if the input is falsy", () => {
    expect(phoneMask("")).toEqual("");
  });
});
