import parseStringToDate from ".";

describe("parseStringToDate", () => {
  it("should return a valid Date object when given a valid date string", () => {
    const dateString = "11/05/2023";
    const expectedDate = new Date("2023-05-11");

    expect(parseStringToDate(dateString)).toEqual(expectedDate);
  });
});
