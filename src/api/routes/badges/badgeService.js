const oracledb = require("oracledb");

const db_options = {
  outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
  // extendedMetaData: true,               // get extra metadata
  // prefetchRows:     100,                // internal buffer allocation size for tuning
  // fetchArraySize:   100                 // internal buffer allocation size for tuning
};

module.exports = {
  getBadges: async () => {
    try {
      const connection = await oracledb.getConnection();
      const queryString = `SELECT * FROM Badge`;

      const result = await connection.execute(queryString, {}, db_options);

      return result;
    } catch (err) {
      console.log("err", err);
    }
  },
  getBadgeByNumber: async (number) => {},
};
