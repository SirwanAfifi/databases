const request = require("supertest");
const app = require("../../app");
const Driver = require("../../models/driver");

describe("Drivers controller", () => {
  it("Post to /api/drivers creates a new driver", done => {
    Driver.countDocuments().then(count => {
      request(app)
        .post("/api/drivers")
        .send({ email: "safifi@gmail.com" })
        .end((err, response) => {
          Driver.countDocuments().then(newCount => {
            expect(count + 1).toEqual(newCount);
            done();
          });
        });
    });
  });
});
