const badgeRoutes = require("express").Router();
const BadgeController = require("./badgeController");

badgeRoutes.get("/", BadgeController.getBadges);
badgeRoutes.get("/active", BadgeController.getActiveBadges);

module.exports = badgeRoutes;
