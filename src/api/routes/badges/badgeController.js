const BadgeService = require("./badgeService");
const oracledb = require("oracledb");

module.exports = {
  getBadges: async (req, res, next) => {
    const connection = await oracledb.getConnection();
    const badgeNumber = req.query.badge_number;

    try {
      if (badgeNumber)
        return res.json(
          await BadgeService.getBadgeByNumber({ badgeNumber, connection })
        );

      return res.json(await BadgeService.getBadges({ connection }));
    } catch (err) {
      return next(err);
    }
  },
  getActiveBadges: async (req, res, next) => {
    const connection = await oracledb.getConnection();
    try {
      return res.json(await BadgeService.getActiveBadges({ connection }));
    } catch (err) {
      return next(err);
    }
  },
};
