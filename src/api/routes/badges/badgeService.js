const oracledb = require("oracledb");
const { ErrorHandler } = require("../../../utils/error");

const db_options = {
  outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
  // extendedMetaData: true,               // get extra metadata
  // prefetchRows:     100,                // internal buffer allocation size for tuning
  // fetchArraySize:   100                 // internal buffer allocation size for tuning
};

const handleError = ({ statusCode, message }) => {
  throw new ErrorHandler(statusCode || 500, message);
};

const closeConnection = async (connection) => {
  try {
    await connection.close();
  } catch (err) {
    //internal error log and handle - not to be passed to user
    console.error(err);
  }
};

module.exports = {
  getBadges: async () => {
    let connection;

    try {
      connection = await oracledb.getConnection();
      const queryString = `SELECT * FROM Badge`;

      const result = await connection.execute(queryString, {}, db_options);

      if (result.rows.length === 0)
        throw { statusCode: 204, message: "No Records" };

      return result.rows;
    } catch (err) {
      handleError(err);
    } finally {
      if (connection) closeConnection(connection);
    }
  },
  getBadgeByNumber: async (number) => {
    let connection;

    try {
      connection = await oracledb.getConnection();

      const queryString = `SELECT * FROM Badge where BADGE_NUMBER = :badgeNumber`;
      const bindObj = {
        badgeNumber: number,
      };

      const result = await connection.execute(queryString, bindObj, db_options);

      return result;
    } catch (err) {
      handleError(err);
    } finally {
      if (connection) closeConnection(connection);
    }
  },
};
