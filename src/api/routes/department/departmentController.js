const DepartmentService = require("./departmentService");
const oracledb = require("oracledb");

module.exports = {
  getDepartment: async (req, res, next) => {
    const connection = await oracledb.getConnection();
    try {
      return res.json(await DepartmentService.getDepartment({ connection }));
    } catch (err) {
      return next(err);
    }
  },
};
