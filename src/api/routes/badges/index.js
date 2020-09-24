const oracledb = require("oracledb");
const routes = require("express").Router();

const badgeService = require("./badgeService");
const badgeController = require("./badgeController");
const badgeRoutes = require("./badgeRoutes");
const handleRequest = require("../../../utils/requestHandler");

//setup depency injection
const service = badgeService(handleRequest);
const controller = badgeController(service, oracledb.getConnection);

module.exports = badgeRoutes(routes, controller);
