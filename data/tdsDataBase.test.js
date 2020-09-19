const oracledb = require("oracledb");

it("Should connect without error", async (done) => {
  try {
    await oracledb.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD, // mypw contains the hr schema password
      connectString: process.env.DB_CONN_STRING,
    });

    await oracledb.getConnection();
    done();
  } catch (err) {
    done(err);
  }
});
