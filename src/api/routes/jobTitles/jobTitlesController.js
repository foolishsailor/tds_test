module.exports = (service, conn) => {
  return {
    getJobTitles: async (req, res, next) => {
      const connection = await conn();

      try {
        return res.json(await service.getJobTitles({ connection }));
      } catch (err) {
        return next(err);
      }
    },

    getJobTitlesByDepartment: async (req, res, next) => {
      const connection = await conn();

      const department = req.params.department_name;

      try {
        if (department) {
          return res.json(
            await service.getJobTitlesByDepartment({
              department,
              connection,
            })
          );
        }

        throw { statusCode: 422, message: "UNPROCESSABLE ENTITY" };
      } catch (err) {
        return next(err);
      }
    },
  };
};
