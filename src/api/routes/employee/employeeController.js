module.exports = (service, conn) => {
  return {
    getEmployees: async (req, res, next) => {
      const connection = await conn();
      const department = req.query.department_name;

      try {
        if (department) {
          return res.json(
            await service.getEmployeesByDepartment({
              department,
              connection,
            })
          );
        }
        return res.json(await service.getEmployees({ connection }));
      } catch (err) {
        return next(err);
      }
    },
    getActiveEmployees: async (req, res, next) => {
      const connection = await conn();
      try {
        return res.json(await service.getActiveEmployees({ connection }));
      } catch (err) {
        return next(err);
      }
    },
    getActiveEmployees_suggested: async (req, res, next) => {
      const connection = await conn();
      try {
        return res.json(
          await service.getActiveEmployees_suggested({ connection })
        );
      } catch (err) {
        return next(err);
      }
    },
  };
};
