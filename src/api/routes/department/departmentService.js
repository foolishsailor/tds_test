const handleRequest = require("../../../utils/requestHandler");

module.exports = {
  getDepartment: async ({ connection }) => {
    const queryString = `SELECT * FROM Department`;
    return handleRequest({ connection, queryString });
  },
};
