const server = require("../../../../server");
const supertest = require("supertest");
const request = supertest(server);
const { checkArrayEquality } = require("../../../utils/validateData");
const expectedEmployeeKeys = [
  "job_title_code",
  "job_title_name",
  "department_name",
];

describe("ROUTES | /job_titles", () => {
  test("/job_titles returns an array with the expected object", async (done) => {
    const result = await request.get("/job_titles");
    expect(result.body.length).toBeGreaterThanOrEqual(1);
    expect(Object.keys(result.body[0])).toEqual(
      expect.arrayContaining(expectedEmployeeKeys)
    );
    done();
  });

  test("/job_titles/NotADeptName returns 422 Error", async (done) => {
    const deptName = "NotADeptName",
      result = await request.get(`/job_titles/${deptName}`);

    expect(result.res.statusCode).toEqual(422);
    expect(result.res.statusMessage).toEqual('"UNPROCESSABLE ENTITY"');

    done();
  });

  test("/job_titles/:department_name returns an array with the expected opject", async (done) => {
    const deptName = "Software",
      result = await request.get(`/job_titles/${deptName}`);

    expect(result.body.length).toBeGreaterThanOrEqual(1);
    expect(Object.keys(result.body[0])).toEqual(
      expect.arrayContaining(expectedEmployeeKeys)
    );

    //check all items only contain Job_Code expected
    expect(checkArrayEquality(result.body, "department_name", deptName)).toBe(
      true
    );

    done();
  });
});
