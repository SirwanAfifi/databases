const helper = require("../../utils/test_helper");
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

  it("PUT to /api/drivers/:id edits an existing driver", done => {
    const driver = new Driver({ email: "safifi@gmail.com", driving: false });
    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver.id}`)
        .send({ driving: true })
        .end((err, response) => {
          Driver.findOne({ email: "safifi@gmail.com" }).then(driver => {
            expect(driver.driving).toEqual(true);
            done();
          });
        });
    });
  });
});
