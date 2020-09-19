const oracledb = require("oracledb");

const connectOracle = async () => {
  const connection = await oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // mypw contains the hr schema password
    connectString:
      "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=developmentb.cbzwztcxfluc.eu-west-1.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SID=devsuite)))",
  });

  const sql = `SELECT * FROM Employee`;

  let binds = {};

  // For a complete list of options see the documentation.
  const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
    // extendedMetaData: true,               // get extra metadata
    // prefetchRows:     100,                // internal buffer allocation size for tuning
    // fetchArraySize:   100                 // internal buffer allocation size for tuning
  };

  const result = await connection.execute(sql, binds, options);

  console.log("Result", result);
};

console.log("connection", connectOracle());
