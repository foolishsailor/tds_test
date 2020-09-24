const routes = require("express").Router();
const oracledb = require("oracledb");

const employeeService = require("./employeeService");
const employeeRoutes = require("./employeeRoutes");
const employeeController = require("./employeeController");
const handleRequest = require("../../../utils/requestHandler");

//setup dependency injection
const service = employeeService(handleRequest);
const controller = employeeController(service, oracledb.getConnection);

module.exports = employeeRoutes(routes, controller);
