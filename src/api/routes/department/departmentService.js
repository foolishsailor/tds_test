module.exports = (request) => {
  return {
    getDepartment: async ({ connection }) => {
      const queryString = `SELECT DEPARTMENT_CODE as "department_code", DEPARTMENT_NAME as "department_name" 
                          FROM Department`;
      return request({ connection, queryString });
    },
  };
};
