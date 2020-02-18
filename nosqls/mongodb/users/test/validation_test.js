const helper = require("../utils/test_helper");
const User = require("../src/users");

describe("Validating records", () => {
  it("requires a user name", done => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    expect(message).toEqual("Name is required.");
    done();
  });
});
