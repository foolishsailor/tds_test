const jobTitlesRoutes = require("express").Router();
const JobTitleController = require("./jobTitlesController");

jobTitlesRoutes.get("/", JobTitleController.getJobTitles);
jobTitlesRoutes.get(
  "/:department_name",
  JobTitleController.getJobTitlesByDepartment
);

module.exports = jobTitlesRoutes;
