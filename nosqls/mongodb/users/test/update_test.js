const helper = require("../utils/test_helper");
const User = require("../src/users");

describe("Updating records", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "Joe", postCount: 0 });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({})) // {} find everything
      .then(users => {
        expect(users.length).toEqual(1);
        expect(users[0].name).toEqual("Sirwan");
        done();
      });
  }

  it("instance type using set n save", done => {
    joe.set({ name: "Sirwan" });
    assertName(joe.save(), done);
  });

  it("A model instance can update", done => {
    assertName(joe.update({ name: "Sirwan" }), done);
  });

  it("A model class can update", done => {
    assertName(User.update({ name: "Joe" }, { name: "Sirwan" }), done);
  });
  it("A model class can one record", done => {
    assertName(
      User.findOneAndUpdate({ name: "Joe" }, { name: "Sirwan" }),
      done
    );
  });
  it("A model class can find a record a record with an Id and update", done => {
    assertName(User.findByIdAndUpdate(joe._id, { name: "Sirwan" }), done);
  });

  it("A user can have their postCount increamneted by 1", done => {});
});
