const express = require("express");
const server = express();
const basicAuth = require("express-basic-auth");
const { handleError } = require("./src/utils/error");

require("dotenv").config();
require("./data/tdsDataBase");

//routes
const badgeRoutes = require("./src/api/routes/badges");
const departmentRoutes = require("./src/api/routes/department");
const employeeRoutes = require("./src/api/routes/employee");
const jobTitlesRoutes = require("./src/api/routes/jobTitles");

server.use(express.Router());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.use(
  basicAuth({
    users: { admin: process.env.PASSWORD },
    challenge: true,
  })
);


//configure routes
server.use("/badges", badgeRoutes);
server.use("/department", departmentRoutes);
server.use("/employees", employeeRoutes);
server.use("/job_titles", jobTitlesRoutes);

//default notification of API availablility
server.get("/", (req, res) => {
  res.send("TDS Api:  v1.0");
});

//error handler - must be last item in list
server.use((err, req, res, next) => {
  handleError(err, res);
});

if (process.env.NODE_ENV !== "test") {
  server.listen(process.env.SERVER_PORT, "localhost", async (err) => {
    if (err) console.log("Error", err);
    console.log(`Listening on port ${process.env.SERVER_PORT}...`);
  });
}

module.exports = server;
