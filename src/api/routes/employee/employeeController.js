const EmployeeService = require("./employeeService");
const oracledb = require("oracledb");

module.exports = {
  getEmployees: async (req, res, next) => {
    const connection = await oracledb.getConnection();
    const department = req.query.department_name;

    try {
      if (department) {
        return res.json(
          await EmployeeService.getEmployeesByDepartment({
            department,
            connection,
          })
        );
      }
      return res.json(await EmployeeService.getEmployees({ connection }));
    } catch (err) {
      return next(err);
    }
  },
  getActiveEmployees: async (req, res, next) => {
    const connection = await oracledb.getConnection();
    try {
      return res.json(await EmployeeService.getActiveEmployees({ connection }));
    } catch (err) {
      return next(err);
    }
  },
  getActiveEmployees_suggested: async (req, res, next) => {
    const connection = await oracledb.getConnection();
    try {
      return res.json(
        await EmployeeService.getActiveEmployees_suggested({ connection })
      );
    } catch (err) {
      return next(err);
    }
  },
};
