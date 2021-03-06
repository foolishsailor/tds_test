const oracledb = require("oracledb");

const init = async () => {
  try {
    oracledb.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD, // mypw contains the hr schema password
      connectString: process.env.DB_CONN_STRING,
    });
  } catch (err) {
    console.error("init() error: " + err.message);
  }
};

init();
