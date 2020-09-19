const oracledb = require("oracledb");

const init = async () => {
  try {
    oracledb.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD, // mypw contains the hr schema password
      connectString:
        "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=developmentb.cbzwztcxfluc.eu-west-1.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SID=devsuite)))",
    });

    console.log("Connection Pool TDS_DATA started");
  } catch (err) {
    console.error("init() error: " + err.message);
  }
};

init();
