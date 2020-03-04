const helper = require("../../utils/test_helper");
const request = require("supertest");
const app = require("../../app");
const Driver = require("../../models/driver");

describe("Drivers controller", () => {
  it.skip("Post to /api/drivers creates a new driver", done => {
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

  it.skip("PUT to /api/drivers/:id edits an existing driver", done => {
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

  it.skip("DELETE to /api/drivers/:id removes an existing driver", done => {
    const driver = new Driver({ email: "safifi@gmail.com", driving: false });
    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver.id}`)
        .end((err, response) => {
          Driver.countDocuments().then(count => {
            expect(count).toEqual(0);
            done();
          });
        });
    });
  });

  it("GET to /api/drivers finds drivers in a location", done => {
    const seattleDriver = new Driver({
      email: "teh@test.com",
      geometry: {
        type: "Point",
        coordinates: [35.705655, 51.38895]
      }
    });

    const miamiDriver = new Driver({
      email: "san@test.com",
      geometry: {
        type: "Point",
        coordinates: [38.878686, 37.571559]
      }
    });

    Promise.all([seattleDriver.save(), miamiDriver.save()]).then(() => {
      request(app)
        .get(`/api/drivers?lng=36.040457&lat=38.979631`)
        .end((erro, response) => {
          console.log(response.body.length);
          // expect(response.body[0].obj.email).toEqual("miami@test.com");
          //expect(response.length).toEqual(0);
          done();
        });
    });
  });
});
