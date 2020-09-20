const JobTitleService = require("./jobTitlesService");
const oracledb = require("oracledb");

module.exports = {
  getJobTitles: async (req, res, next) => {
    const connection = await oracledb.getConnection();

    try {
      return res.json(await JobTitleService.getJobTitles({ connection }));
    } catch (err) {
      return next(err);
    }
  },

  getJobTitlesByDepartment: async (req, res, next) => {
    const connection = await oracledb.getConnection();

    const department = req.params.department_name;

    try {
      if (department) {
        return res.json(
          await JobTitleService.getJobTitlesByDepartment({
            department,
            connection,
          })
        );
      }

      throw { statusCode: 422, message: "UNPROCESSABLE ENTITY" };
    } catch (err) {
      return next(err);
    }
  },
};
