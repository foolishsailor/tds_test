const handleRequest = require("../../../utils/requestHandler");
const fetchCountry = require("../../../utils/fetchCountry");
const { checkDeptExist } = require("../../../utils/validateData");

const baseQueryString = `SELECT ID as "id", FIRSTNAME as "firstname", LASTNAME as "lastname", BADGE_NUMBER as "badge_number", COUNTRY_CODE as "country", JOB_TITLE_NAME as "job_title", 
                          DEPARTMENT_NAME as "department", START_DATE as "start_date", LEAVE_DATE as "leave_date" 
                          FROM Employee 
                            INNER JOIN Job_Title 
                              ON Employee.Job_Title_Code = Job_Title.Job_Title_Code
                            INNER JOIN Department
                              ON Job_Title.Department_Code = Department.Department_Code`;

module.exports = {
  getEmployees: async ({ connection }) => {
    const result = await handleRequest({
      connection,
      queryString: baseQueryString,
    });
    return fetchCountry(result);
  },

  getEmployeesByDepartment: async ({ department, connection }) => {
    //check for valid department and get department code
    await checkDeptExist({ department, connection });

    const queryString =
      baseQueryString + ` WHERE Department_Name = :department`;

    const result = await handleRequest({
      connection,
      queryString,
      bind: { department },
    });
    return fetchCountry(result);
  },
  getActiveEmployees: async ({ connection }) => {
    const queryString =
      baseQueryString +
      ` WHERE LEAVE_DATE IS NULL OR LEAVE_DATE < CURRENT_TIMESTAMP `;
    const result = await handleRequest({ connection, queryString });
    return fetchCountry(result);
  },
  getActiveEmployees_suggested: async ({ connection }) => {
    const queryString =
      baseQueryString +
      ` WHERE (START_DATE IS NOT NULL AND START_DATE < CURRENT_TIMESTAMP) AND (LEAVE_DATE IS NULL OR LEAVE_DATE > CURRENT_TIMESTAMP)`;
    const result = await handleRequest({ connection, queryString });
    return fetchCountry(result);
  },
};
