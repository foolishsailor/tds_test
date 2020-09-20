const server = require("../../../../server");
const supertest = require("supertest");
const request = supertest(server);
const {
  filterDate,
  checkArrayEquality,
} = require("../../../utils/validateData");

//Notes detailed testing of objects done in service testing

const expectedEmployeeKeys = [
  "id",
  "firstname",
  "lastname",
  "badge_number",
  "country",
  "job_title",
  "department",
  "start_date",
  "leave_date",
];

describe("ROUTES | /employees", () => {
  test("/employees returns an array with the expected object", async (done) => {
    const result = await request.get("/employees");
    expect(result.body.length).toBeGreaterThanOrEqual(1);
    expect(Object.keys(result.body[0])).toEqual(
      expect.arrayContaining(expectedEmployeeKeys)
    );
    done();
  });

  test("/employees/active | It should only return an array of employees with Leave Dates Null or before today", async (done) => {
    const result = await request.get("/employees/active");
    expect(result.body.length).toBeGreaterThanOrEqual(1);
    expect(Object.keys(result.body[0])).toEqual(
      expect.arrayContaining(expectedEmployeeKeys)
    );

    //Filter out all expected values - if any are left than query failed.
    expect(
      filterDate({ arr: result.body, property: "leave_date", operator: 1 })
        .length
    ).toEqual(0);

    done();
  });

  test("/employees/active/suggested returns an array with the expected opject", async (done) => {
    const result = await request.get("/employees/active/suggested");
    expect(result.body.length).toBeGreaterThanOrEqual(1);
    expect(Object.keys(result.body[0])).toEqual(
      expect.arrayContaining(expectedEmployeeKeys)
    );

    //Filter out all expected values - if any are left than query failed.
    expect(
      filterDate({ arr: result.body, property: "leave_date", operator: -1 })
        .length
    ).toEqual(0);

    done();
  });

  test("/employees?department_name=[department_name] returns an array with the expected opject", async (done) => {
    const deptName = "Software",
      result = await request.get(`/employees?department_name=${deptName}`);

    expect(result.body.length).toBeGreaterThanOrEqual(1);
    expect(Object.keys(result.body[0])).toEqual(
      expect.arrayContaining(expectedEmployeeKeys)
    );

    expect(checkArrayEquality(result.body, "department", deptName)).toBe(true);

    done();
  });

  test("/employees?department_name=NotADeptName returns 422 Error", async (done) => {
    const deptName = "NotADeptName",
      result = await request.get(`/employees?department_name=${deptName}`);

    expect(result.res.statusCode).toEqual(422);
    expect(result.res.statusMessage).toEqual('"UNPROCESSABLE ENTITY"');

    done();
  });
});
