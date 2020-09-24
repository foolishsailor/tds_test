module.exports = (routes, controller) => {
  routes.get("/", controller.getJobTitles);
  routes.get("/:department_name", controller.getJobTitlesByDepartment);

  return routes;
};
