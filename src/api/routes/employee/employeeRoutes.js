const employeeRoutes = require("express").Router();
const EmployeeController = require("./employeeController");

employeeRoutes.get("/", EmployeeController.getEmployees);
employeeRoutes.get("/active", EmployeeController.getActiveEmployees);
employeeRoutes.get(
  "/active/suggested",
  EmployeeController.getActiveEmployees_suggested
);

module.exports = employeeRoutes;
