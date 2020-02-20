const helper = require("../utils/test_helper");
const User = require("../src/users");

describe("Subdocuments", () => {
  it("can create a subdocument", done => {
    const posts = [{ title: "Learn MongoDB" }, { title: "C# Collections" }];
    const joe = new User({
      name: "Joe",
      posts
    });

    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        expect(user.posts[0].title).toEqual("Learn MongoDB");
        done();
      });
  });

  it("can add subdocuments to an existing record", done => {
    const joe = new User({ name: "Joe", posts: [] });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        user.posts.push({ title: "New post" });
        return user.save();
      })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        expect(user.posts[0].title).toEqual("New post");
        done();
      });
  });

  it("can remove an existing", done => {
    const joe = new User({ name: "Joe", posts: [{ title: "New post" }] });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        const post = user.posts[0];
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        expect(user.posts.length).toEqual(0);
        done();
      });
  });
});
