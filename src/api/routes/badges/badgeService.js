const handleRequest = require("../../../utils/requestHandler");

const baseQueryString = `SELECT BADGE_NUMBER as "badge_number", BADGE_STATUS as "badge_status", BADGE_EXPIRY_DATE as "badge_expiry_date" 
                          FROM Badge`;

module.exports = {
  getBadges: async ({ connection }) => {
    return handleRequest({ connection, queryString: baseQueryString });
  },
  getBadgeByNumber: async ({ badgeNumber, connection }) => {
    //trap malformed query parameters
    if (isNaN(badgeNumber))
      throw { statusCode: 422, message: "UNPROCESSABLE ENTITY" };

    const queryString = baseQueryString + ` WHERE BADGE_NUMBER = :badgeNumber`;

    return handleRequest({ connection, queryString, bind: { badgeNumber } });
  },
  getActiveBadges: async ({ connection }) => {
    const queryString =
      baseQueryString +
      ` WHERE BADGE_STATUS = 'Active' AND BADGE_EXPIRY_DATE > CURRENT_TIMESTAMP`;
    return handleRequest({ connection, queryString });
  },
};
