const oracledb = require("oracledb");
const routes = require("express").Router();

const jobTitleService = require("./jobTitlesService");
const jobTitleController = require("./jobTitlesController");
const jobTitleRoutes = require("./jobTitlesRoutes");
const handleRequest = require("../../../utils/requestHandler");

//setup dependency injection
const service = jobTitleService(handleRequest);
const controller = jobTitleController(service, oracledb.getConnection);

module.exports = jobTitleRoutes(routes, controller);
