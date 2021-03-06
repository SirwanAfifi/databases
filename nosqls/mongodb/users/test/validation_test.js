const helper = require("../utils/test_helper");
const User = require("../src/users");

describe.skip("Validating records", () => {
  it("requires a user name", () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    expect(message).toEqual("Name is required.");
  });

  it("requires a user's name longer 2 charcters", () => {
    const user = new User({ name: "Al" });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    expect(message).toEqual("Name must be longer 2 characters.");
  });

  it("disallows invalid records from being saved", done => {
    const user = new User({ name: "Al" });
    user.save().catch(validationResult => {
      const { message } = validationResult.errors.name;
      expect(message).toEqual("Name must be longer 2 characters.");
      done();
    });
  });
});
