const DriverController = require("../controllers/drivers_controller");

module.exports = app => {
  app.get("/api", DriverController.gretting);
};
