const server = require("../../../../server"); // Link to your server file
const supertest = require("supertest");
const request = supertest(server);
const { filterDate } = require("../../../utils/validateData");

const expectedBadgeKeys = ["badge_number", "badge_status", "badge_expiry_date"];

describe("ROUTES | /badges", () => {
  test("/badges | returns a response that is an array with expected object", async (done) => {
    // Sends GET Request to /test endpoint
    const result = await request.get("/badges");
    expect(result.body.length).toBeGreaterThan(1);
    expect(Object.keys(result.body[0])).toEqual(
      expect.arrayContaining(expectedBadgeKeys)
    );
    done();
  });

  test("/badges?badge_number=101 | returns array with 1 object with expected values", async (done) => {
    // Sends GET Request to /test endpoint
    const badgeNumber = 101;
    const result = await request.get(`/badges?badge_number=${badgeNumber}`);
    expect(result.body.length).toBe(1);
    expect(Object.keys(result.body[0])).toEqual(
      expect.arrayContaining(expectedBadgeKeys)
    );
    expect(result.body[0]).toEqual(
      expect.objectContaining({
        badge_number: badgeNumber,
      })
    );
    done();
  });

  test("/badges?badge_number=aString | It should trap isNaN query and return 422 error", async (done) => {
    const result = await request.get("/badges?badge_number=aString");
    expect(result.res.statusCode).toEqual(422);
    expect(result.res.statusMessage).toEqual('"UNPROCESSABLE ENTITY"');

    done();
  });

  test("/badges?badge_number=9999999 | It should return err 404 'No Records' if return array is empty", async (done) => {
    const result = await request.get("/badges?badge_number=9999999");
    expect(result.res.statusCode).toEqual(404);
    expect(result.res.statusMessage).toEqual('"No Records"');

    done();
  });

  test("/badges/active | returns a respone that is an array with an expected obejct", async (done) => {
    // Sends GET Request to /test endpoint
    const result = await request.get("/badges/active");
    expect(result.body.length).toBeGreaterThan(1);
    expect(Object.keys(result.body[0])).toEqual(
      expect.arrayContaining(expectedBadgeKeys)
    );

    expect(result.body).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ badge_status: "Disabled" }),
      ])
    );
    expect(result.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ badge_status: "Active" }),
      ])
    );

    //Filter out all expected values - if any are left than query failed.
    expect(
      filterDate({
        arr: result.body,
        property: "badge_expiry_date",
        operator: -1,
      }).length
    ).toEqual(0);

    done();
  });
});
