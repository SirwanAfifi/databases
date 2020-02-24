const helper = require("../utils/test_helper");
const User = require("../src/users");

describe.skip("Virtual Types", () => {
  it("postCounts returns number of posts", done => {
    const joe = new User({ name: "Joe", posts: [{ title: "PostTitle" }] });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        expect(user.postCount).toEqual(1);
        done();
      });
  });
});
