const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

beforeEach(async done => {
  await mongoose.connect("mongodb://localhost:27017/users_test", {
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

afterEach(done => {
  done();
});

test("should ", done => {
  done();
});
