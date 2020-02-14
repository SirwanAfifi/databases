const helper = require("../utils/test_helper");
const User = require("../src/users");

describe("Reading users out of the database", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  it("finds all users with name of joe", done => {
    User.find({ name: "Joe" }).then(users => {
      console.log(users[0].id);
      console.log(joe.id);
      expect(users[0]._id === joe._id);
      done();
    });
  });
});
