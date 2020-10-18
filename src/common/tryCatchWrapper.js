module.exports = callback => async (req, res, next) => {
  try {
    return await callback(req, res, next);
  } catch (err) {
    return next(err);
  }
};
