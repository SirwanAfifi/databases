const helper = require("../utils/test_helper");

const User = require("../src/users");

describe("Creating records", () => {
  it("saves a user", done => {
    const joe = new User({ name: "Joe" });

    joe.save().then(() => {
      expect(joe.isNew).toEqual(false);
      done();
    });
  });
});
