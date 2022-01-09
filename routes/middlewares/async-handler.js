export default (requestHandler) => async (req, res, next) => {
  try {
    await requestHandler(req, res);
  } catch (e) {
    next(e.message);
  }
};
