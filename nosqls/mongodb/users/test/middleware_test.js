const mongoose = require("mongoose");
const helper = require("../utils/test_helper");
const User = require("../src/users");
const BlogPost = require("../src/blogPost");

describe("Middleware", () => {
  let joe, blogPost;
  beforeEach(done => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Yep it really is"
    });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it("users clean up dangling blogposts on remove", done => {
    joe
      .remove()
      .then(() => BlogPost.count())
      .then(count => {
        expect(count).toEqual(0);
      });
  });
});
