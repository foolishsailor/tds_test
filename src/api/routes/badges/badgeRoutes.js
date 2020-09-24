module.exports = (routes, controller) => {
  routes.get("/", controller.getBadges);
  routes.get("/active", controller.getActiveBadges);

  return routes;
};
