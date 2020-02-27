const helper = require("../utils/test_helper");
const User = require("../src/users");

describe("Reading users out of the database", () => {
  let joe, user2, user3, user4;

  beforeEach(done => {
    user2 = new User({ name: "User2" });
    user3 = new User({ name: "user3" });
    user4 = new User({ name: "user4" });
    joe = new User({ name: "Joe" });

    Promise.all([
      user2.save(),
      user3.save(),
      user4.save(),
      joe.save()
    ]).then(() => done());
  });

  it.skip("finds all users with name of joe", done => {
    User.find({ name: "Joe" }).then(users => {
      expect(users[0].id).not.toBe(joe.id);
      done();
    });
  });

  it.skip("finds a user with a particular id", done => {
    User.findOne({ _id: joe._id }).then(user => {
      expect(user.name).toEqual("Joe");
      done();
    });
  });

  it("can skip and limit the result set", done => {
    User.find({})
      .skip(1)
      .limit(2)
      .then(users => {
        expect(users.length).toEqual(2);
        done();
      });
  });
});
