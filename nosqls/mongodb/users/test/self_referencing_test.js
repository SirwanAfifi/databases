const helper = require("../utils/test_helper");
const BlogComment = require("../src/blogComment");

describe("Self Referencing", () => {
  let comment1, comment12, comment121;
  beforeEach(done => {
    comment1 = new BlogComment({ body: "Sirwan's comment" });
    comment12 = new BlogComment({ body: "Reply to Sirwan's comment" });
    comment121 = new BlogComment({
      body: "Reply to reply to Sirwan's comment"
    });
    comment1.replies.push(comment12);
    comment12.replies.push(comment121);

    comment1.save().then(_ => {
      done();
    });
  });

  it("shows the tree", done => {
    BlogComment.findOne({ body: "Sirwan's comment" }).then(comment => {
      expect(comment.body).toEqual("Sirwan's comment");
      done();
    });
  });
});
