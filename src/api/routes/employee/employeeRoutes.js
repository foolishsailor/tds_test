module.exports = (routes, controller) => {
  routes.get("/", controller.getEmployees);
  routes.get("/active", controller.getActiveEmployees);
  routes.get("/active/suggested", controller.getActiveEmployees_suggested);

  return routes;
};
