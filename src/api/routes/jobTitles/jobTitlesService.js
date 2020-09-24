const { checkDeptExist } = require("../../../utils/validateData");

const baseQueryString = `SELECT JOB_TITLE_CODE as "job_title_code", JOB_TITLE_NAME as "job_title_name", DEPARTMENT_NAME as"department_name" 
                          FROM Job_Title
                            INNER JOIN Department
                              ON Job_Title.DEPARTMENT_CODE = Department.Department_Code`;

module.exports = (request) => {
  return {
    getJobTitles: async ({ connection }) => {
      return await request({
        connection,
        queryString: baseQueryString,
      });
    },
    getJobTitlesByDepartment: async ({ department, connection }) => {
      //check for valid department and get department code
      await checkDeptExist({ department, connection });

      const queryString =
        baseQueryString + ` WHERE Department_Name = :department`;

      return await request({
        connection,
        queryString,
        bind: { department },
      });
    },
  };
};
