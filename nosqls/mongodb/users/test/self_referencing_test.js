const helper = require("../utils/test_helper");
const BlogComment = require("../src/blogComment");

describe("Self Referencing", () => {
  let comment;
  beforeEach(done => {
    comment = new BlogComment({
      body: "Comment 1",
      replies: [
        new BlogComment({
          body: "Comment 1.1",
          replies: [
            new BlogComment({
              body: "Comment 1.1.1"
            })
          ]
        }),
        new BlogComment({
          body: "Comment 1.2",
          replies: [
            new BlogComment({
              body: "Comment 1.2.1",
              replies: [
                new BlogComment({
                  body: "Comment 1.2.1.1",
                  replies: [
                    new BlogComment({
                      body: "Comment 1.2.1.1.1",
                      replies: [
                        new BlogComment({
                          body: "Comment 1.2.1.1.1.1",
                          replies: [
                            new BlogComment({
                              body: "Last comment"
                            })
                          ]
                        })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    });

    comment.save().then(_ => {
      done();
    });
  });

  it("shows the tree", done => {
    BlogComment.findOne({ body: "Comment 1.2" }).then(comment => {
      // expect(comment.body).toEqual("Sirwan's comment");
      // expect(comment.total).toEqual(8);
      console.log(comment);
      // console.log(JSON.stringify(comment));
      done();
    });
  });
});
