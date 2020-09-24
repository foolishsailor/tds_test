module.exports = (routes, controller) => {
  routes.get("/", controller.getDepartment);

  return routes;
};
