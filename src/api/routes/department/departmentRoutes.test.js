const server = require("../../../../server");
const supertest = require("supertest");
const agent = supertest.agent(server).auth("admin", process.env.PASSWORD);
const request = supertest(server);

describe("ROUTES | /department", () => {
  test("/department | returns 401 unauthorized", async (done) => {
    const result = await request.get("/department");
    expect(result.res.statusCode).toEqual(401);
    expect(result.res.statusMessage).toEqual("Unauthorized");
    done();
  });
  test("/department | returns an array with the expected opject", async (done) => {
    const result = await agent.get("/department");
    expect(result.body.length).toBeGreaterThan(1);
    expect(Object.keys(result.body[0])).toEqual(
      expect.arrayContaining(["department_code", "department_name"])
    );
    done();
  });
});
