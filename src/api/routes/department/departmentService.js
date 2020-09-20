const handleRequest = require("../../../utils/requestHandler");

module.exports = {
  getDepartment: async ({ connection }) => {
    const queryString = `SELECT DEPARTMENT_CODE as "department_code", DEPARTMENT_NAME as "department_name" 
                          FROM Department`;
    return handleRequest({ connection, queryString });
  },
};
