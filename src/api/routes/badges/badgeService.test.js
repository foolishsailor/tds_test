const oracledb = require("oracledb");
const BadgeService = require("./badgeService");

describe("Badge routes test", () => {
  let connection;

  beforeAll(async () => {
    await oracledb.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD, // mypw contains the hr schema password
      connectString: process.env.DB_CONN_STRING,
    });
  });

  beforeEach(async () => {
    connection = await oracledb.getConnection();
  });

  describe("getActivetBadges", () => {
    test("It should only return badges with active status and after current date", async (done) => {
      const spyDate = jest.spyOn(global, "Date");
      const date = spyDate.mock.instances[0];

      try {
        const result = await BadgeService.getActiveBadges({ connection });
        expect(result.length).toBeGreaterThan(1);
        expect(Object.keys(result[0])).toEqual(
          expect.arrayContaining([
            "BADGE_NUMBER",
            "BADGE_STATUS",
            "BADGE_EXPIRY_DATE",
          ])
        );

        expect(result).toEqual(
          expect.not.arrayContaining([
            expect.objectContaining({ BADGE_STATUS: "Disabled" }),
          ])
        );
        expect(result).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ BADGE_STATUS: "Active" }),
          ])
        );
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe("getBadges", () => {
    test("It should return Err 503 is no connection", async (done) => {
      const badConn = null;
      try {
        await BadgeService.getBadges({
          connection: badConn,
        });
        done();
      } catch (err) {
        expect(err).toEqual({
          statusCode: 503,
          message: "Service Unavailable",
        });
        done();
      }
    });

    test("It should return array with proper badge object", async (done) => {
      try {
        const result = await BadgeService.getBadges({ connection });
        expect(result.length).toBeGreaterThan(1);
        expect(Object.keys(result[0])).toEqual(
          expect.arrayContaining([
            "BADGE_NUMBER",
            "BADGE_STATUS",
            "BADGE_EXPIRY_DATE",
          ])
        );
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe("getBadgeByNumber", () => {
    test("It should return err 404 'No Records' if return array is empty", async (done) => {
      const badgeNumbers = "[9999999]"; //nonexistant badge num
      try {
        await BadgeService.getBadgeByNumber({ badgeNumbers, connection });
        done();
      } catch (err) {
        expect(err).toEqual({ statusCode: 404, message: "No Records" });
        done();
      }
    });

    test("It should return 1 record", async (done) => {
      const badgeNumbers = "[101]";
      try {
        const badge = await BadgeService.getBadgeByNumber({
          badgeNumbers,
          connection,
        });
        expect(badge.length).toBe(1);
        done();
      } catch (err) {
        done(err);
      }
    });

    test("It should return 2 records", async (done) => {
      const badgeNumbers = "[101, 102]";
      try {
        const badge = await BadgeService.getBadgeByNumber({
          badgeNumbers,
          connection,
        });
        expect(badge.length).toBe(2);
        done();
      } catch (err) {
        done(err);
      }
    });

    test("It should ignore badge number that doesnt exist and return 2 records", async (done) => {
      const badgeNumbers = "[101, 999, 102]";
      try {
        const badge = await BadgeService.getBadgeByNumber({
          badgeNumbers,
          connection,
        });
        expect(badge.length).toBe(2);
        done();
      } catch (err) {
        done(err);
      }
    });

    test("It should trap isNaN query and return 422 error", async (done) => {
      const badgeNumbers = ["999"];
      try {
        await BadgeService.getBadgeByNumber({ badgeNumbers, connection });
        done();
      } catch (err) {
        expect(err).toEqual({
          statusCode: 422,
          message: "UNPROCESSABLE ENTITY",
        });
        done();
      }
    });

    test("It should trap malformed query and return 422 error", async (done) => {
      const badgeNumbers = 999; //not a string as would be in query param
      try {
        await BadgeService.getBadgeByNumber({ badgeNumbers, connection });
        done();
      } catch (err) {
        expect(err).toEqual({
          statusCode: 422,
          message: "UNPROCESSABLE ENTITY",
        });
        done();
      }
    });

    test("It should return Err 503 is no connection", async (done) => {
      const badConn = null;
      const badgeNumbers = "[101]";
      try {
        await BadgeService.getBadgeByNumber({
          badgeNumbers,
          connection: badConn,
        });
        done();
      } catch (err) {
        expect(err).toEqual({
          statusCode: 503,
          message: "Service Unavailable",
        });
        done();
      }
    });
  });
});
