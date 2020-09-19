const server = require("../../../../server"); // Link to your server file
const supertest = require("supertest");
const request = supertest(server);

describe("ROUTES | /badges", () => {
  test("/badges | returns a response that is an array with expected object", async (done) => {
    // Sends GET Request to /test endpoint
    const result = await request.get("/badges");
    expect(result.body.length).toBeGreaterThan(1);
    expect(Object.keys(result.body[0])).toEqual(
      expect.arrayContaining([
        "BADGE_NUMBER",
        "BADGE_STATUS",
        "BADGE_EXPIRY_DATE",
      ])
    );
    done();
  });

  test("/badges?badge_number=[101] | returns array with 1 object", async (done) => {
    // Sends GET Request to /test endpoint
    const result = await request.get("/badges?badge_number=[101]");
    expect(result.body.length).toBe(1);
    expect(Object.keys(result.body[0])).toEqual(
      expect.arrayContaining([
        "BADGE_NUMBER",
        "BADGE_STATUS",
        "BADGE_EXPIRY_DATE",
      ])
    );
    done();
  });

  test("It should trap isNaN query and return 422 error", async (done) => {
    const result = await request.get("/badges?badge_number=[aString]");
    expect(result.res.statusCode).toEqual(422);
    expect(result.res.statusMessage).toEqual('"UNPROCESSABLE ENTITY"');

    done();
  });
});

describe("Routes | /badges/active", () => {
  test("/badges/active | resturns a respone that is an array with an expected obejct", async (done) => {
    // Sends GET Request to /test endpoint
    const result = await request.get("/badges/active");
    expect(result.body.length).toBeGreaterThan(1);
    expect(Object.keys(result.body[0])).toEqual(
      expect.arrayContaining([
        "BADGE_NUMBER",
        "BADGE_STATUS",
        "BADGE_EXPIRY_DATE",
      ])
    );
    done();
  });
});
