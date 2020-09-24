const oracledb = require("oracledb");
const routes = require("express").Router();

const departmentService = require("./departmentService");
const departmentController = require("./departmentController");
const departmentRoutes = require("./departmentRoutes");
const handleRequest = require("../../../utils/requestHandler");

//setup dependency injection
const service = departmentService(handleRequest);
const controller = departmentController(service, oracledb.getConnection);

module.exports = departmentRoutes(routes, controller);
