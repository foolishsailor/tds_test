module.exports = (service, conn) => {
  return {
    getDepartment: async (req, res, next) => {
      const connection = await conn();
      try {
        return res.json(await service.getDepartment({ connection }));
      } catch (err) {
        return next(err);
      }
    },
  };
};
