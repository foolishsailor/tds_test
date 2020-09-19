const BadgeService = require("./badgeService");

module.exports = {
  getBadges: async (req, res, next) => {
    const badgeNumber = req.query.badge_number;

    try {
      if (badgeNumber)
        return res.json(await BadgeService.getBadgeByNumber(badgeNumber));

      return res.json(await BadgeService.getBadges());
    } catch (err) {
      console.log("Controller Error", err);
      return next(err);
    }
  },
  getActiveBadges: async (req, res, next) => {},
};
