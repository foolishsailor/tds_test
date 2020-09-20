const handleRequest = require("./requestHandler");

module.exports = {
  checkDeptExist: async ({ connection, department }) => {
    //check for valid department and get department code
    const queryString = `SELECT * FROM Department WHERE DEPARTMENT_NAME = :department`;

    try {
      await handleRequest({
        connection,
        queryString,
        bind: { department },
        keepOpen: true,
      });
    } catch (err) {
      throw { statusCode: 422, message: "UNPROCESSABLE ENTITY" };
    }
  },
  filterDate: ({ arr, property, operator = 1 }) => {
    //Filter out all expected values - if any are left than query failed.
    const dateFilter = new Date();

    return arr.filter((item) =>
      operator === 1
        ? item[property] !== null && new Date(item[property]) > dateFilter
        : item[property] !== null && new Date(item[property]) < dateFilter
    );
  },
  checkArrayEquality: (arr, property, value) => {
    //check all items only contain Job_Code expected
    return arr
      .map((item) => item[property])
      .every((department) => department === value);
  },
};
