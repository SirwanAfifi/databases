const request = require("supertest");
const app = require("../app");

describe("Drivers controller", () => {
  it("Post to /api/drivers creates a new driver", done => {
    request(app)
      .post("/api/drivers")
      .send({ email: "safifi@gmail.com" })
      .end((err, response) => {
        expect(response.body.email).toEqual("safifi@gmail.com");
        done();
      });
  });
});
