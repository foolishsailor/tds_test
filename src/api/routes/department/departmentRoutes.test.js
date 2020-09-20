const server = require("../../../../server");
const supertest = require("supertest");
const request = supertest(server);

describe("ROUTES | /department", () => {
  test("/department returns an array with the expected opject", async (done) => {
    const result = await request.get("/department");
    expect(result.body.length).toBeGreaterThan(1);
    expect(Object.keys(result.body[0])).toEqual(
      expect.arrayContaining(["department_code", "department_name"])
    );
    done();
  });
});
