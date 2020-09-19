const departmentRoutes = require("express").Router();
const DepartmentController = require("./departmentController");

departmentRoutes.get("/", DepartmentController.getDepartment);

module.exports = departmentRoutes;
