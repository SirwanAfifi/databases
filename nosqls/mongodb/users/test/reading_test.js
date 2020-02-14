const helper = require("../utils/test_helper");
const User = require("../src/users");

describe.skip("Reading users out of the database", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  it.skip("finds all users with name of joe", done => {
    User.find({ name: "Joe" }).then(users => {
      expect(users[0].id).not.toBe(joe.id);
      done();
    });
  });

  it("finds a user with a particular id", done => {
    User.findOne({ _id: joe._id }).then(user => {
      expect(user.name).toEqual("Joe");
      done();
    });
  });
});
