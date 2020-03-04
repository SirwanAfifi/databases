const mongoose = require("mongoose");

beforeAll(done => {
  mongoose.connect("mongodb://localhost:27017/muber_test", {
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
  const { drivers } = mongoose.connection.collections;

  drivers
    .drop()
    .then(() => done())
    .catch(() => done());
}
