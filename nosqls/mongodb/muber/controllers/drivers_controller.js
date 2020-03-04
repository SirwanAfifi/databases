const Driver = require("../models/driver");

module.exports = {
  gretting(req, res) {
    res.send({ hi: "there" });
  },
  index(req, res, next) {
    const { lng, lat } = req.query;
    Driver.aggregate()
      .near({
        distanceField: "dist.calculated",
        near: [parseFloat(lng), parseFloat(lat)],
        spherical: true,
        maxDistance: 200000
      })
      .then(drivers => res.send(drivers))
      .catch(next);
  },
  create(req, res, next) {
    const driverProps = req.body;

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);
  },
  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findByIdAndUpdate(driverId, driverProps)
      .then(() => Driver.findById({ _id: driverId }))
      .then(driver => res.send(driver))
      .catch(next);
  },
  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findOneAndDelete({ _id: driverId })
      .then(() => Driver.findById({ _id: driverId }))
      .then(driver => res.send(driver))
      .catch(next);
  }
};
