const oracledb = require("oracledb");

const db_options = {
  outFormat: oracledb.OUT_FORMAT_OBJECT,
};

const closeConnection = async (connection) => {
  try {
    await connection.close();
  } catch (err) {
    //internal error log and handle - not to be passed to user
    console.error(err);
  }
};

const handleRequest = async ({
  connection,
  queryString,
  bind = {},
  keepOpen = false,
}) => {
  if (!connection) throw { statusCode: 503, message: "Service Unavailable" };

  try {
    const result = await connection.execute(queryString, bind, db_options);

    if (result.rows.length === 0)
      throw { statusCode: 404, message: "No Records" };

    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (connection && !keepOpen) closeConnection(connection);
  }
};

module.exports = handleRequest;
