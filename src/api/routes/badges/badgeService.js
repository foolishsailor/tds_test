const handleRequest = require("../../../utils/requestHandler");

module.exports = {
  getBadges: async ({ connection }) => {
    const queryString = `SELECT * FROM Badge`;
    return handleRequest({ connection, queryString });
  },
  getBadgeByNumber: async ({ badgeNumbers, connection }) => {
    let badges, badgeParamaters;

    //trap malformed query parameters
    try {
      badges = JSON.parse(badgeNumbers);

      //build parameterized array and trap non numeric badges
      badgeParamaters = badges
        .map((badge, index) => {
          if (isNaN(badge))
            throw { statusCode: 422, message: "UNPROCESSABLE ENTITY" };

          return `:${index}`;
        })
        .join(", ");
    } catch (err) {
      throw { statusCode: 422, message: "UNPROCESSABLE ENTITY" };
    }

    const queryString = `SELECT * FROM Badge WHERE BADGE_NUMBER IN (${badgeParamaters})`;

    return handleRequest({ connection, queryString, bind: badges });
  },
  getActiveBadges: async ({ connection }) => {
    const queryString = `SELECT * FROM Badge WHERE BADGE_STATUS = 'Active' AND BADGE_EXPIRY_DATE > CURRENT_TIMESTAMP`;
    return handleRequest({ connection, queryString });
  },
};
