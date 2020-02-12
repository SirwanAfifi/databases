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
      console.log("Good to go!");
    })
    .on("error", error => {
      console.warn("Warning", error);
    });
});

beforeEach(done => {
  const { users } = mongoose.connection.collections;
  users.drop(() => {
    done();
  });
});
