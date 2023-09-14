import validateDate from ".";

describe("validateDate", () => {
  it("should return true for valid dates", () => {
    const validDates = [
      new Date("2022-01-01"),
      new Date("2022-02-28"),
      new Date("2022-03-31"),
      new Date("2022-04-30"),
      new Date("2022-05-31"),
      new Date("2022-06-30"),
      new Date("2022-07-31"),
      new Date("2022-08-31"),
      new Date("2022-09-30"),
      new Date("2022-10-31"),
      new Date("2022-11-30"),
      new Date("2022-12-31"),
    ];

    validDates.forEach((date) => {
      expect(validateDate(date)).toBe(true);
    });
  });
});
