const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

beforeAll(done => {
  mongoose.connect("mongodb://localhost:27017/users_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", error => {
      console.warn("Warning", error);
    });
});

beforeEach(done => {
  dropDbs(done);
});

afterEach(done => {
  dropDbs(done);
});

function dropDbs(done) {
  const {
    users,
    comments,
    blogposts,
    blogcomments
  } = mongoose.connection.collections;

  users &&
    users.drop(() => {
      comments &&
        comments.drop(() => {
          blogposts &&
            blogposts.drop(() => {
              done();
            });
        });
    });

  blogcomments &&
    blogcomments.drop(() => {
      console.log("Dropped");
      done();
    });
}
