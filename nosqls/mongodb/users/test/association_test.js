const helper = require("../utils/test_helper");
const User = require("../src/users");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");

describe.skip("Assocations", () => {
  let joe, blogPost, comment;
  beforeEach(done => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Yep it really is"
    });
    comment = new Comment({ content: "Great post" });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it.skip("saves a relation between a user and a blogpost", done => {
    User.findOne({ name: "Joe" })
      .populate("blogPosts")
      .then(user => {
        expect(user.blogPosts[0].title).toEqual("JS is Great");
        done();
      });
  });

  it("saves a full relation tree", done => {
    User.findOne({ name: "Joe" })
      .populate({
        path: "blogPosts",
        populate: {
          path: "comments",
          model: "comment",
          populate: {
            path: "user",
            model: "user"
          }
        }
      })
      .then(user => {
        expect(user.blogPosts[0].title).toEqual("JS is Great");
        expect(user.blogPosts[0].comments[0].content).toEqual("Great post");
        expect(user.blogPosts[0].comments[0].user.name).toEqual("Joe");
        done();
      });
  });
});
