const DriverController = require("../controllers/drivers_controller");

module.exports = app => {
  app.get("/api", DriverController.gretting);

  app.post("/api/drivers", DriverController.create);
  app.put("/api/drivers/:id", DriverController.edit);
};
