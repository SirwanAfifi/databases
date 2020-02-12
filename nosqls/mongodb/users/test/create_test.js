const helper = require("../utils/test_helper");

const User = require("../src/users");

describe("Creating records", () => {
  it("saves a user", () => {
    const joe = new User({ name: "Joe" });

    joe.save();
  });
});
