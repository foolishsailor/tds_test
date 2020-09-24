module.exports = (service, conn) => {
  return {
    getBadges: async (req, res, next) => {
      const connection = await conn();
      const badgeNumber = req.query.badge_number;

      try {
        if (badgeNumber)
          return res.json(
            await service.getBadgeByNumber({ badgeNumber, connection })
          );

        return res.json(await service.getBadges({ connection }));
      } catch (err) {
        return next(err);
      }
    },
    getActiveBadges: async (req, res, next) => {
      const connection = await conn();
      try {
        return res.json(await service.getActiveBadges({ connection }));
      } catch (err) {
        return next(err);
      }
    },
  };
};
